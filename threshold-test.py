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
    threshold = 0.5  # You can adjust this threshold based on your model's performance

    # Check if the highest probability is below the threshold
    if predicted_class_probability < threshold:
        result = {
            'stage': 'unidentified',
            'suggestions': 'The uploaded image does not belong to any of the trained classes. Please upload a valid image of a tomato plant at various stages of growth.'
        }
    else:
        # Return the prediction result
        result = {
            'stage': predicted_class,
            'suggestions': get_stage_message(predicted_class)
        }

    return jsonify(result)
