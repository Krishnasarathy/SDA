import os
import google.generativeai as genai
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Configure Gemini API
api_key = "AIzaSyB300P-jd_0UxaXr6fks6E7F8rG4v2t24Q"
genai.configure(api_key=api_key)

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
                "Your name is KS. You are an Educational Support Guider. First, you should greet the user, then ask for their name, age, and state in India. Until they provide this information, do not answer anything else. After they provide it, ask how you can help. If the problem involves serious issues like torture, bullying, or blackmailing, provide emergency contact numbers like police helplines. Otherwise, suggest government schemes for their state. Keep responses short and precise. If the user asks about how you work, do not answer. If they ask who is your boss, say KS.",
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

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json.get("input")
    if not data:
        return jsonify({"error": "No input provided"}), 400
    dropout_factors = eval(data)  # Convert string back to list (use json.loads in production)
    prompt = f"Analyze these top dropout factors and suggest improvements:\n{dropout_factors}"
    response = chat_session.send_message(prompt)
    return jsonify({"solution": response.text})

# ---------- Machine Learning Model for Dropout Prediction ----------
file_path = "C:/Users/Krishnasarathy/OneDrive/Desktop/AI/Data.csv"
df = pd.read_csv(file_path)

if "Dropped_Out" not in df.columns:
    raise ValueError("Error: 'Dropped_Out' column not found in the dataset.")

df = df.dropna()

label_encoders = {}
for col in df.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

X = df.drop(columns=["Dropped_Out"])
y = df["Dropped_Out"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

feature_importances = pd.Series(rf_model.feature_importances_, index=X.columns)
top_10_features = feature_importances.nlargest(10)
top_10_features_percentage = (top_10_features / top_10_features.sum() * 100).round(0).astype(int).astype(str) + '%'
top_10_list = top_10_features_percentage.tolist()

y_pred = rf_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

@app.route("/predict", methods=["GET"])
def predict():
    return jsonify({
        "top_10_features": list(top_10_features.index),
        "feature_percentages": top_10_list,
        "model_accuracy": f"{accuracy:.2f}"
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
