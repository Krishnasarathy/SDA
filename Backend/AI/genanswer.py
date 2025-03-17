import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS globally

# Configure Gemini API securely
genai.configure(api_key="AIzaSyB300P-jd_0UxaXr6fks6E7F8rG4v2t24Q")

# Create the model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    generation_config=generation_config,
)

chat_session = model.start_chat(history=[])

# Flask App
app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json.get("input")
    if not data:
        return jsonify({"error": "No input provided"}), 400

    # Convert JSON string back to structured format
    dropout_factors = eval(data)  # Convert string back to list (use json.loads in production)

    # Create AI query prompt
    prompt = f"Analyze these top dropout factors and suggest improvements:\n{dropout_factors}"

    response = chat_session.send_message(prompt)
    return jsonify({"solution": response.text})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
