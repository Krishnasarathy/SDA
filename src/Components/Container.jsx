import {
    MDBContainer,
    MDBRow,
    MDBCol,
    
  } from 'mdb-react-ui-kit';
  import { motion } from 'framer-motion';
  import conImage from '../assets/Images/308.jpg'


  const Container = () => {
    return (
      <MDBContainer fluid className="p-5 overflow-hidden">
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          ><motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h4
              className="my-1 display-3 fw-bold ls-tight px-3"
              style={{ color: "#eeae31", fontSize: "40px" }}
            >
              Education is the bridge that turns dreams into reality let&apos;s empower every child, regardless of financial barriers, to cross it and create  <br />
              <span style={{ color: "#3db54b" }}>
              a brighter future for themselves and the world.
              </span>
            </h4>
            </motion.div>
          </MDBCol>
  
          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>
  
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              
              <img
                src={conImage}
                alt="Empowering Education"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "500px", // Sets a max width for the image
                  borderRadius: "10px", // Optional rounded corners
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for better design
                }}
              />
              
            </motion.div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };
  
  export default Container;
  