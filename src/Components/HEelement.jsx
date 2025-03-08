import {
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCol,
    MDBCardBody,
  } from "mdb-react-ui-kit";
  import { motion } from "framer-motion";
  import CountUp from "react-countup";
  
  function HElement() {
    return (
      <MDBContainer fluid>
        <MDBRow className="justify-content-center">
          <MDBCol md="10">
            <section>
            <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
              <h3 className="mb-4" style={{color:"purple",fontSize:"2.5rem",textAlign:"center"}}>Data</h3></motion.div>
              <MDBRow>
                <MDBCol md="4" className="mb-md-0">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <MDBCard>
                      <MDBCardBody >
                        <p className="text-muted mb-1">Government Schools</p>
                        <h2 className="mb-0">
                          <CountUp start={0} end={1022386} duration={2} separator="," />+
                        </h2>
                      </MDBCardBody>
                    </MDBCard>
                  </motion.div>
                </MDBCol>
  
                <MDBCol md="4" className="mb-md-0">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <MDBCard>
                      <MDBCardBody>
                        <p className="text-muted mb-1">Private Schools</p>
                        <h2 className="mb-0">
                          <CountUp start={0} end={335844} duration={2} separator="," />+
                        </h2>
                      </MDBCardBody>
                    </MDBCard>
                  </motion.div>
                </MDBCol>
  
                <MDBCol md="4" className="mb-md-0">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <MDBCard>
                      <MDBCardBody>
                        <p className="text-muted mb-1">Dropout Rate 2023-2024</p>
                        <h2 className="mb-0">
                          <CountUp start={0} end={10.9} decimals={2} duration={2} suffix="%" />
                        </h2>
                      </MDBCardBody>
                    </MDBCard>
                  </motion.div>
                </MDBCol>
              </MDBRow>
            </section>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
  
  export default HElement;
  