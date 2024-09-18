from flask import Flask, request, jsonify
from transformers import BertTokenizer, BertForSequenceClassification
import torch
from torch.nn.functional import softmax

app = Flask(__name__)

# Load pre-trained BERT model and tokenizer
model_name = "nlptown/bert-base-multilingual-uncased-sentiment"  
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForSequenceClassification.from_pretrained(model_name)

@app.route("/home", methods=["GET"])
def home():
    app.logger.info("Home API call")
    return jsonify({"message": "Hello Flask"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("Predict API is calling")
        data = request.json
        if not data or 'text' not in data:
            return jsonify({"error": "Missing 'text' field"}), 400

        text = data['text']

        # Tokenize input text
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)

        # Perform inference
        with torch.no_grad():
            outputs = model(**inputs)

        # Get the predicted probabilities
        probs = softmax(outputs.logits, dim=1)
        predicted_class = torch.argmax(probs).item()

        # Debug: print the raw logits and probabilities
        print("Raw logits:", outputs.logits)
        print("Softmax probabilities:", probs)
        print(f"Predicted class index: {predicted_class}")

        # Map sentiment predictions to technology or non-technology
        if predicted_class in [0, 1, 2]:
            result = {"classification": "Non-Technology"}
        elif predicted_class in [3, 4]:
            result = {"classification": "Technology-Related"}
        else:
            return jsonify({"error": "Predicted class index out of range", "index": predicted_class}), 500

        print("Classification result:", result)
        return jsonify(result)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
