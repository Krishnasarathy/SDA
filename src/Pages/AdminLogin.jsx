import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn } from "mdb-react-ui-kit";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/admin/login", {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage("Login successful!");
        localStorage.setItem("isAdminAuthenticated", "true"); // Store session
        navigate("/admin"); // Redirect to admin page
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100">
        <MDBCard style={{ maxWidth: "400px", width: "100%" }} className="p-4 shadow-lg">
          <MDBCardBody>
            <h2 className="text-center mb-4">Admin Login</h2>
            <form onSubmit={handleLogin}>
              <MDBInput
                wrapperClass="mb-3"
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <MDBInput
                wrapperClass="mb-3"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <MDBBtn className="w-100" type="submit">Login</MDBBtn>
            </form>
            {message && <p className="mt-3 text-center text-danger">{message}</p>}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default AdminLogin;
