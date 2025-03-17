from flask import Flask, request, jsonify,session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Enable CORS for frontend-backend communication
from flask import send_file
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import letter
import io
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Krishna%40%23ks77@localhost:3306/SDA'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Student Model (Aadhar & Mobile as Unique)
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    grade = db.Column(db.String(20), nullable=False)
    schooltype = db.Column(db.String(50), nullable=False)
    aadharnumber = db.Column(db.BigInteger, unique=True, nullable=False)  # Unique
    mobile = db.Column(db.BigInteger, unique=True, nullable=False)  # Unique
    fathersname = db.Column(db.String(50), nullable=False)
    mothersname = db.Column(db.String(50), nullable=False)
    annualincome = db.Column(db.Integer, nullable=False)
    distancefromschooltohome = db.Column(db.Integer, nullable=False)
    issue = db.Column(db.String(255), nullable=False)

# Create Tables
with app.app_context():
    db.create_all()



# 🔥 Set a unique, secret key for session encryption
app.secret_key = "a3f5b1d9c8e6f7a4b2c3d1e9f8g7h6i5j4k3l2m1n0o9p8q7"

# ⏳ Set session timeout to 1 hour
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1)

# Dummy admin credentials with hashed password
ADMIN_CREDENTIALS = {
    "admin_1": generate_password_hash("admin@#123")
}

@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username in ADMIN_CREDENTIALS:
        stored_hashed_password = ADMIN_CREDENTIALS[username]
        if check_password_hash(stored_hashed_password, password):
            session.permanent = True  # ✅ Enable session expiration
            session['admin'] = username  # ✅ Store admin session
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/admin/logout', methods=['POST'])
def admin_logout():
    session.pop('admin', None)  # 🚀 Logout admin
    return jsonify({"message": "Logged out successfully"}), 200

# Route to Add Student (POST)
@app.route('/students', methods=['POST'])
def add_student():
    data = request.json
    try:
        new_student = Student(**data)
        db.session.add(new_student)
        db.session.commit()
        return jsonify({'message': 'Student added successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# Route to Get All Students (GET)
@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    student_list = [
        {k: v for k, v in s.__dict__.items() if k != '_sa_instance_state'}
        for s in students
    ]
    return jsonify(student_list), 200

# Route to Get Student by Mobile Number (GET)
@app.route('/students/pdf/<int:mobile>', methods=['GET'])
def generate_pdf(mobile):
    try:
        student = Student.query.filter_by(mobile=mobile).first()
        if not student:
            return jsonify({"error": "Student not found"}), 404

        buffer = io.BytesIO()
        pdf = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter

        # Title
        pdf.setFont("Helvetica-Bold", 20)
        pdf.drawCentredString(width / 2, height - 80, "Student Report")

        y_position = height - 120
        line_spacing = 25

        def add_label_value(label, value, y_pos):
            pdf.setFont("Helvetica-Bold", 12)
            pdf.drawString(100, y_pos, f"{label}:")
            pdf.setFont("Helvetica", 12)
            # Handle potential None values and convert to string safely
            pdf.drawString(250, y_pos, str(value) if value is not None else "N/A")

        # Add Student Details (CRITICAL: Check for None values)
        try:  # Inner try-except for student data
            add_label_value("First Name", student.firstname, y_position)
            add_label_value("Last Name", student.lastname, y_position - line_spacing)
            add_label_value("Age", student.age, y_position - 2 * line_spacing) # removed str()
            add_label_value("Class", student.grade, y_position - 3 * line_spacing)
            add_label_value("School Type", student.schooltype, y_position - 4 * line_spacing)
            add_label_value("Mobile Number", student.mobile, y_position - 5 * line_spacing) # removed str()
            add_label_value("Aadhar Number", student.aadharnumber, y_position - 6 * line_spacing) # removed str()
            add_label_value("Father's Name", student.fathersname, y_position - 7 * line_spacing)
            add_label_value("Mother's Name", student.mothersname, y_position - 8 * line_spacing)
            add_label_value("Annual Income", student.annualincome, y_position - 9 * line_spacing) # removed str()
            add_label_value("Distance from School", student.distancefromschooltohome, y_position - 10 * line_spacing) # removed str()
            add_label_value("Issues", student.issue, y_position - 11 * line_spacing)

        except Exception as e:
            print(f"Error adding student details: {e}") # Log the error!
            pdf.drawString(100, height/2, "Error displaying student information.")  # Indicate error in PDF
            pdf.save()  # Still try to save even with error
            buffer.seek(0)
            return send_file(buffer, as_attachment=True, download_name=f"error_report_{mobile}.pdf", mimetype='application/pdf')


        # Add Government Logo (Optional)
        try:
            logo_path = "./government-of-india.jpg"  # Adjust path if needed
            logo = ImageReader(logo_path)
            pdf.drawImage(logo, width - 120, 50, width=60, height=60, mask='auto')
        except Exception as e:
            print(f"Logo Error: {e}")  # Log the error!

        pdf.save()
        buffer.seek(0)

        return send_file(buffer, as_attachment=True, download_name=f"{student.firstname}_report.pdf", mimetype='application/pdf')

    except Exception as e: # Outer try-except
        print(f"General PDF Generation Error: {e}")  # Log the error!
        return jsonify({"error": "Error generating PDF"}), 500  # Return error to frontend

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
