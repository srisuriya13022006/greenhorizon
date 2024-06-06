import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os

# Load the trained model
model = load_model('plant_cnn_model1.h5')
image_size = (150, 150)
# Define class labels based on folder names
class_labels = os.listdir(r'E:\\projects\\train')  # Assuming train directory path

# Preprocess the input image
img_path = r"C:\Users\srisu\OneDrive\Desktop\0abc57ec-7f3b-482a-8579-21f3b2fb780b___RS_Erly.B 7609.JPG"  # Replace with the path to your input image
img = image.load_img(img_path, target_size=image_size)
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array /= 255.  # Normalize pixel values

# Make predictions
predictions = model.predict(img_array)

# Get predicted class
predicted_class = class_labels[np.argmax(predictions)]

print("Predicted class:", predicted_class)
