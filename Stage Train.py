import tensorflow as tf
from tensorflow.keras import layers, models, callbacks
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define parameters
image_size = (150, 150)
batch_size = 32
epochs = 20  # Increasing the number of epochs for better training
num_classes = 5  # Number of stages

# Define CNN architecture
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(256, (3, 3), activation='relu'),  # Added an additional Conv2D layer
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(256, activation='relu'),  # Increased the number of units
    layers.Dropout(0.5),  # Added dropout for regularization
    layers.Dense(128, activation='relu'),
    layers.Dense(64, activation='relu'),
    layers.Dense(num_classes, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Data preprocessing and augmentation
train_datagen = ImageDataGenerator(rescale=1./255,
                                   rotation_range=40,  # Increased augmentation parameters
                                   width_shift_range=0.2,
                                   height_shift_range=0.2,
                                   shear_range=0.2,
                                   zoom_range=0.2,
                                   horizontal_flip=True,
                                   fill_mode='nearest',
                                   validation_split=0.2)  # Added validation split

train_generator = train_datagen.flow_from_directory(
    r'E:\projects\tomato (2)\tomato_train',  # Update the path to your dataset
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='training')  # Use subset for training

validation_generator = train_datagen.flow_from_directory(
    r'E:\projects\tomato (2)\tomato_train',  # Same dataset path
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation')  # Use subset for validation

# Define callbacks
early_stopping = callbacks.EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
reduce_lr = callbacks.ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=3, min_lr=0.0001)

# Train the model
history = model.fit(train_generator,
                    epochs=epochs,
                    validation_data=validation_generator,
                    callbacks=[early_stopping, reduce_lr])

# Save the trained model
model.save('tomato_cnn.h5')
