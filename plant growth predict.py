import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os

# Define the base directory containing the model files
model_dir = r'E:\projects\GREEN HORIZON\plant_growth model'

# Define image size
image_size = (150, 150)

# Define class labels for each plant
class_labels = {
    'beetroot': ['seedling', 'vegetative', 'flowering', 'mature'],
    'cauliflower': ['seedling', 'vegetative', 'flowering', 'mature'],
    'tomato': ['seedling', 'vegetative', 'flowering', 'mature'],
    'lettuce': ['seedling', 'vegetative', 'flowering', 'mature'],
    'brinjal': ['seedling', 'vegetative', 'flowering', 'mature'],
    'cucumber': ['seedling', 'vegetative', 'flowering', 'mature'],
    'capsicum': ['seedling', 'vegetative', 'flowering', 'mature']
}

# Function to preprocess the input image
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=image_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize pixel values
    return img_array

# Function to predict the output from the model
def predict_output(plant_type, img_path):
    # Load the corresponding model for the plant type
    model_path = os.path.join(model_dir, f'{plant_type}_growth_cnn.h5')
    model = load_model(model_path)

    # Preprocess the input image
    img_array = preprocess_image(img_path)

    # Make predictions
    predictions = model.predict(img_array)

    # Print predictions for debugging
    print(f"Predictions for {plant_type}: {predictions}")

    # Get predicted class
    predicted_class = class_labels[plant_type][np.argmax(predictions)]

    return predicted_class

# Example usage
img_path = r"E:\plant_growth\cucumber\seedling\scene00611.png"  # Replace with the path to your input image
plant_type = 'cucumber'  # Replace with the plant type for the input image
predicted_class = predict_output(plant_type, img_path)
print("Predicted class:", predicted_class)
