from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Configure Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Krishna@#ks77@localhost:3306/SDA'  # MySQL connection
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define Student Model
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    class_grade = db.Column(db.Integer, nullable=False)
    school_type = db.Column(db.String(50), nullable=False)
    aadhar = db.Column(db.String(12), unique=True, nullable=False)
    mobile = db.Column(db.String(15), nullable=False)
    father_name = db.Column(db.String(100), nullable=False)
    mother_name = db.Column(db.String(100), nullable=False)
    annual_income = db.Column(db.Integer, nullable=False)
    distance = db.Column(db.Float, nullable=False)

# Create database tables
with app.app_context():
    db.create_all()

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
