import os
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define parameters
image_size = (150, 150)
batch_size = 32
epochs = 100
base_dataset_dir = r'E:\plant_growth'

# Function to create a mod.
# el
def create_model(num_classes):
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 3)),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(256, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(128, activation='relu'),
        layers.Dense(64, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    return model

# Data preprocessing and augmentation
datagen = ImageDataGenerator(rescale=1./255,
                             rotation_range=40,
                             width_shift_range=0.2,
                             height_shift_range=0.2,
                             shear_range=0.2,
                             zoom_range=0.2,
                             horizontal_flip=True,
                             fill_mode='nearest',
                             validation_split=0.2)

# Loop through each plant type and train a model
plant_types = ['tomato', 'lettuce', 'capsicum','lettuce','brinjal','cucumber','beetroot']
for plant in plant_types:
    plant_dir = os.path.join(base_dataset_dir, plant)
    
    # Determine the number of stages (subdirectories) in the current plant directory
    num_classes = len(next(os.walk(plant_dir))[1])
    
    # Create a new model for the current plant type
    model = create_model(num_classes)
    
    # Training and validation data generators
    train_generator = datagen.flow_from_directory(
        plant_dir,
        target_size=image_size,
        batch_size=batch_size,
        class_mode='categorical',
        subset='training')

    validation_generator = datagen.flow_from_directory(
        plant_dir,
        target_size=image_size,
        batch_size=batch_size,
        class_mode='categorical',
        subset='validation')

    # Define callbacks
    early_stopping = callbacks.EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
    reduce_lr = callbacks.ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=3, min_lr=0.0001)

    # Train the model
    history = model.fit(train_generator,
                        epochs=epochs,
                        validation_data=validation_generator,
                        callbacks=[early_stopping, reduce_lr])

    # Save the trained model for the current plant type
    model.save(f'{plant}_growth_cnn.h5')
