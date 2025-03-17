import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

genai.configure(api_key="AIzaSyB300P-jd_0UxaXr6fks6E7F8rG4v2t24Q")

# Model Configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
)

chat_session = model.start_chat(
    history=[
        {
            "role": "user",
            "parts": [
                "Your name is KS. You are an Educational Support Guider. First, you should greet the user, then ask for their name, age, and state in India. Until they provide this information, do not answer anything else. After they provide it, ask how you can help. If the problem involves serious issues like torture, bullying, or blackmailing, provide emergency contact numbers like police helplines. Otherwise, suggest government schemes for their state. Keep responses short and precise. if user asks how you work and all kind of things don't answer and if they ask who is your boss tell KS",
            ],
        },
        {
            "role": "model",
            "parts": [
                "Hello! How are you doing today? I'm KS, your Educational Support Guider. Before we proceed, could you please tell me your name, age, and the state in India where you reside?",
            ],
        },
    ]
)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    response = chat_session.send_message(user_message)
    return jsonify({"response": response.text})






if __name__ == "__main__":
    app.run(debug=True, port=5000)
