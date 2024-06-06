import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from flask import Flask, request, jsonify, render_template
import base64
import io
from PIL import Image

app = Flask(__name__)

# Load the trained model
model = load_model('tomato_cnn.h5')
image_size = (150, 150)

# Define class labels
class_labels = ['stage 1', 'stage 2', 'stage 3', 'stage 4', 'stage 5']

def preprocess_image(image_data):
    # Convert the base64 string to bytes and then to a PIL Image
    image_bytes = base64.b64decode(image_data.split(',')[1])
    image_pil = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    # Resize the image to match the input size of the model
    image_resized = image_pil.resize(image_size)
    # Convert the image to a numpy array and normalize it
    image_array = np.array(image_resized) / 255.0
    # Expand the dimensions to match the input shape of the model
    image_expanded = np.expand_dims(image_array, axis=0)
    return image_expanded

def get_stage_message(predicted_class):
    messages = {
        'stage 1': "Congratulations on nurturing new life! Just like these tiny leaves that have emerged, your efforts and care are the first steps toward a fruitful journey. Each day, your tomato plant grows a little stronger, just as you do with every new experience. Remember, growth takes time, patience, and a lot of love. Keep going, and soon, you’ll see your small efforts blossom into a rewarding harvest. You’ve got this!",
        'stage 2': "Your tomato plant's growth shows your dedication! Use strong support to keep it upright. Remove extra shoots to help it focus on making fruit. Feed it every few weeks with balanced food. Put a layer of mulch around the base to keep the soil moist and stop weeds. Water it deeply and regularly at the base, especially in the morning. Keep up the good care, and soon you'll have delicious tomatoes!",
        'stage 3': "Every bloom on your tomato plant is a promise of delicious fruit to come! Keep up the great work, and soon you'll be enjoying the fruits of your labor.",
        'stage 4': "Your hard work helps tomatoes grow well. Each small tomato is like a promise of yummy taste, showing that you're doing a good job. Keep going because soon you'll have tasty red tomatoes. Make sure the plants have support, trim extra leaves, and give them food. Watch out for bugs, cover the ground with stuff to keep moisture, and make a nice place for tomatoes to grow.",
        'stage 5': "As you harvest the ripe, juicy tomatoes from your plants, remember that each one is a testament to your dedication and care. Let the satisfaction of this successful harvest inspire you to continue nurturing and growing more plants. Your efforts contribute to a greener, more abundant world, and each tomato harvested is a reminder of the joy that comes from cultivating the earth."
    }
    return messages.get(predicted_class, "Congratulations on your tomato plant's progress!")

@app.route('/')
def index():
    return render_template('profile.html')

@app.route('/analyze_image', methods=['POST'])
def analyze_image():
    # Get the image data from the request
    data = request.json
    image_data = data['image']
    print(f"Received image data: {image_data[:30]}...")  # Print the first 30 characters for verification
    
    # Preprocess the image
    processed_image = preprocess_image(image_data)
    
    # Make predictions using the loaded model
    predictions = model.predict(processed_image)
    print(f"Predictions: {predictions}")  # Print predictions for debugging
    
    # Get the class label with the highest probability
    predicted_class_index = np.argmax(predictions)
    predicted_class_probability = predictions[0][predicted_class_index]
    predicted_class = class_labels[predicted_class_index]
    print(f"Predicted class: {predicted_class}, Probability: {predicted_class_probability}")  # Print predicted class and probability for debugging
    
    # Define a threshold for considering the image as part of the trained classes
    threshold = 0.9  # Adjusted threshold

    # Check if the highest probability is below the threshold
    if predicted_class_probability < threshold:
        result = {
            'stage': 'unidentified',
            'suggestions': 'The uploaded image does not belong to any of the trained classes. Please upload a valid image.'
        }
    else:
        # Return the prediction result
        result = {
            'stage': predicted_class,
            'suggestions': get_stage_message(predicted_class)
        }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
