import { MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import StudentInformation from "./Studentinformation";

const AdminPage = () => {


    const handleLogout = () => {
        localStorage.removeItem("isAdminAuthenticated");
        window.location.href = "/adminlogin"; // Redirect to login page
      };
      
  return (
    <>
    <br/>
    <h2 style={{textAlign:"center",color:"black"}}>Financial Literacy Registration</h2>
    <br/><br/><br/><br/>
    <StudentInformation/>
    
    <br/>
    <MDBContainer fluid className="d-flex justify-content-center  vh-100">
        <form >
           <MDBBtn onClick={handleLogout} style={{backgroundColor:"red"}} className="w-100" type="submit">Logout</MDBBtn>
        </form>
      </MDBContainer>
      
      </>
  )
}

export default AdminPage
