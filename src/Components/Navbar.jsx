import  { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';





export default function Navbar() {
  const [openNavColorThird, setOpenNavColorThird] = useState(false);

  const navbarStyle = {
    backgroundColor: '#EEF5F9',
    fontFamily: 'Roboto, sans-serif',
    color: 'white', // Add your desired font color here
  };
  




  return (
    <>
      <MDBNavbar expand='lg' light style={navbarStyle}>
        <MDBContainer fluid>
           <Link to='/' >
          <MDBNavbarBrand >
            <h4
              className="my-1 display-3 fw-bold ls-tight px-3"
              style={{ color: "#2599EC", fontSize: "45px" }}
            >
              SDA
            </h4></MDBNavbarBrand></Link>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavColorThird(!openNavColorThird)}
          >
            <MDBIcon fas icon='bars'  />
          </MDBNavbarToggler>
          <MDBCollapse open={openNavColorThird} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              {/* <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' style={{color:'black', fontFamily:'sans-serif'}}>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem> */}
              <MDBNavbarItem>
                <Link to='/Dropout'> <MDBNavbarLink href='#' style={{color:'black', fontFamily:'sans-serif'}} >Dropout Analysis</MDBNavbarLink></Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
              <Link to="/Financial"> <MDBNavbarLink  style={{color:'black', fontFamily:'sans-serif'}} >Financial Literacy</MDBNavbarLink></Link>
              </MDBNavbarItem>
              
              <MDBNavbarItem>
              
               <Link to="/adminlogin"> <MDBNavbarLink style={{color:'black', fontFamily:'sans-serif'}}>Admin</MDBNavbarLink></Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
              
                <MDBNavbarLink style={{color:'black', fontFamily:'sans-serif'}}>About Us</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>              
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
