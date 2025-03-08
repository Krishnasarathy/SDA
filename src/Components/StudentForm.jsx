import { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import "../assets/CSS/forms.css";

export default function StudentForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    grade: "",
    schooltype: "",
    aadharnumber: "",
    mobile: "",
    fathersname: "",
    mothersname: "",
    annualincome: "",
    distancefromschooltohome: "",
  });

  const [error, setError] = useState("");
  const [basicModal, setBasicModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Allow only numbers for mobile and Aadhar and enforce length limits
    if (id === "mobile" && (!/^\d{0,10}$/.test(value))) return;
    if (id === "aadharnumber" && (!/^\d{0,12}$/.test(value))) return;

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (let key in formData) {
      if (!formData[key]) {
        setError("All fields are required.");
        return;
      }
    }

    // Validation for mobile and Aadhar
    if (formData.mobile.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }
    if (formData.aadharnumber.length !== 12) {
      setError("Aadhar number must be exactly 12 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const data = await response.json();
      console.log(data);

      // Reset form and error
      setFormData({
        firstname: "",
        lastname: "",
        age: "",
        grade: "",
        schooltype: "",
        aadharnumber: "",
        mobile: "",
        fathersname: "",
        mothersname: "",
        annualincome: "",
        distancefromschooltohome: "",
        issue: "", 
      });
      setError("");

      // Open success modal
      setBasicModal(true);
    } catch (err) {
      console.error("Error adding student:", err);
      setError(
        "Failed to add student. Please check the input fields or check if Mobile/Aadhar is already registered."
      );
    }
  };

  return (
    <>
      <MDBContainer
        fluid
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <MDBCard
          style={{
            maxWidth: "500px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
          className="p-4 shadow-lg"
        >
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-4">Student Registration</h3>

              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput
                    id="firstname"
                    label="First Name *"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    id="lastname"
                    label="Last Name *"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-2"
                type="number"
                id="age"
                label="Age *"
                value={formData.age}
                onChange={handleChange}
                min="1"
                required
              />

              <div className="mb-4">
                <label className="form-label">Class *</label>
                <select
                  id="grade"
                  className="form-select"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Class Grade</option>
                  {[...Array(12).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">School Type *</label>
                <select
                  id="schooltype"
                  className="form-select"
                  value={formData.schooltype}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select School Type</option>
                  <option value="Government">Government School</option>
                  <option value="Private">Private School</option>
                </select>
              </div>

              <MDBInput
                wrapperClass="mb-2"
                type="text"
                id="aadharnumber"
                label="Aadhar Number (12 digits) *"
                value={formData.aadharnumber}
                onChange={handleChange}
                maxLength="12"
                pattern="\d{12}"
                required
              />

              <MDBInput
                wrapperClass="mb-4"
                type="text"
                id="mobile"
                label="Mobile Number (10 digits) *"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
                pattern="\d{10}"
                required
              />

              <MDBInput
                wrapperClass="mb-4"
                id="fathersname"
                label="Father's Name *"
                value={formData.fathersname}
                onChange={handleChange}
                required
              />

              <MDBInput
                wrapperClass="mb-4"
                id="mothersname"
                label="Mother's Name *"
                value={formData.mothersname}
                onChange={handleChange}
                required
              />

              <MDBInput
                wrapperClass="mb-4"
                type="number"
                id="annualincome"
                label="Annual Income *"
                value={formData.annualincome}
                onChange={handleChange}
                min="0"
                required
              />

              <MDBInput
                wrapperClass="mb-4"
                type="number"
                id="distancefromschooltohome"
                label="Distance from School to Home *"
                value={formData.distancefromschooltohome}
                onChange={handleChange}
                min="0"
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                type="text"
                id="issue"
                label="Issue (if any)"
                value={formData.issue}
                onChange={handleChange}
              />


              {error && <p className="text-danger">{error}</p>}

              <MDBBtn className="mb-4 w-100" type="submit">
                Submit
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Registration Successful</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setBasicModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Student has been successfully registered!</MDBModalBody>
            <MDBModalBody>You will receive reply within 2 days</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setBasicModal(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
