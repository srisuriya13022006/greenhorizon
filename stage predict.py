import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os

# Load the trained model
model = load_model('tomato_cnn.h5')
image_size = (150, 150)

# Define class labels based on folder names
class_labels = os.listdir(r'E:\projects\tomato (2)\tomato_train')  # Assuming train directory path

# Preprocess the input image
img_path = r"E:\projects\tomato (2)\tomato_train\stage 3\scene02021.png"  # Replace with the path to your input image
img = image.load_img(img_path, target_size=image_size)
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array /= 255.  # Normalize pixel values

# Make predictions
predictions = model.predict(img_array)

# Define a confidence threshold
confidence_threshold =0.9

# Get predicted class
predicted_confidence = np.max(predictions)
if predicted_confidence < confidence_threshold:
    predicted_class = "wrong image"
else:
    predicted_class = class_labels[np.argmax(predictions)]

print("Predicted class:", predicted_class)
