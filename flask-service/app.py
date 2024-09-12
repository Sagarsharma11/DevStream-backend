from flask import Flask, request, jsonify
from transformers import BertTokenizer, BertForSequenceClassification
import torch
from torch.nn.functional import softmax

app = Flask(__name__)

# Load pre-trained BERT model and tokenizer
model_name = "nlptown/bert-base-multilingual-uncased-sentiment"  # Or use a fine-tuned model
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForSequenceClassification.from_pretrained(model_name)


@app.route("/home", methods=["GET"])
def home():
    app.logger.info("Home API call")
    return jsonify({"message":"Hello Flask"})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get('text', '')
    
    # Tokenize input text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    
    # Perform inference
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Get the predicted probabilities
    probs = softmax(outputs.logits, dim=1)
    predicted_class = torch.argmax(probs).item()
    
    # Define labels (assuming binary classification: 0 for non-tech, 1 for tech)
    labels = ["Non-Technology", "Technology-Related"]
    result = {"classification": labels[predicted_class]}
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
