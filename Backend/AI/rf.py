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

# Configure Gemini AI
genai.configure(api_key="AIzaSyB300P-jd_0UxaXr6fks6E7F8rG4v2t24Q")

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
                "Your name is KS. You are an Educational Support Guider. First, you should greet the user, then ask for their name, age, and state in India. Until they provide this information, do not answer anything else. After they provide it, ask how you can help. If the problem involves serious issues like torture, bullying, or blackmailing, provide emergency contact numbers like police helplines. Otherwise, suggest government schemes for their state. Keep responses short and precise. If the user asks about how you work, do not answer and you should able to speak in all languages in india if user speaks in their state language you should speak in their language. If they ask who is your boss, say KS .",
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

# ---------- Machine Learning Model for Dropout Prediction ----------
# Load dataset and train Random Forest model once at startup
file_path = "C:/Users/Krishnasarathy/OneDrive/Desktop/AI/Data.csv"
df = pd.read_csv(file_path)

if "Dropped_Out" not in df.columns:
    raise ValueError("Error: 'Dropped_Out' column not found in the dataset.")

df = df.dropna()

# Encode categorical variables
label_encoders = {}
for col in df.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

X = df.drop(columns=["Dropped_Out"])
y = df["Dropped_Out"]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Random Forest model
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Get feature importances
feature_importances = pd.Series(rf_model.feature_importances_, index=X.columns)
top_10_features = feature_importances.nlargest(10)

# Convert importance values to percentage format and store in a list
top_10_features_percentage = (top_10_features / top_10_features.sum() * 100).round(0).astype(int).astype(str) + '%'
top_10_list = top_10_features_percentage.tolist()

# Calculate model accuracy
y_pred = rf_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

@app.route("/predict", methods=["GET"])
def predict():
    return jsonify({
        "top_10_features": list(top_10_features.index),  # Send feature names
        "feature_percentages": top_10_list,  # Send percentages
        "model_accuracy": f"{accuracy:.2f}"
    })

# ---------- New Route for Education Schemes ----------
education_schemes = {
    "Number_of_Failures": [
        "Samagra Shiksha Abhiyan (SSA) - Provides remedial coaching and teacher training to improve learning outcomes.",
        "Rashtriya Madhyamik Shiksha Abhiyan (RMSA) - Focuses on improving secondary education and reducing academic failures."
    ],
    "Age & Health_Status": [
        "Mid-Day Meal Scheme - Ensures better nutrition to improve student health and attendance.",
        "Ayushman Bharat - School Health Programme - Offers free health check-ups and counseling."
    ],
    "Mother_Education & Father_Education": [
        "Saakshar Bharat - Educates illiterate adults, including parents, to create awareness about education."
    ],
    "Wants_Higher_Education": [
        "National Means-cum-Merit Scholarship Scheme (NMMS) - Provides financial assistance to economically weaker students.",
        "Post Matric Scholarships - Supports SC/ST/OBC & Minority students to pursue higher education."
    ],
    "Travel_Time": [
        "Transport & Escort Facilities under Samagra Shiksha Abhiyan - Provides free transportation or bicycles for students.",
        "Kasturba Gandhi Balika Vidyalaya (KGBV) - Residential schools for girls to reduce travel-related dropouts."
    ],
    "Mother_Job & Father_Job": [
        "National Child Labour Project (NCLP) - Rehabilitates child laborers by providing free education and vocational training.",
        "Skill India Mission & PMKVY - Offers skill training to parents to reduce economic pressure on children."
    ],
    "Address": [
        "Eklavya Model Residential Schools (EMRS) - Ensures access to quality education for tribal students in remote areas.",
        "Digital India & SWAYAM - Provides online learning resources and Good Learning centers for rural students."
    ]
}

@app.route("/schemes", methods=["GET"])
def schemes():
    return jsonify(education_schemes)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
