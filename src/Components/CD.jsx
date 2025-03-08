import PropTypes from "prop-types";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCol,
 
} from 'mdb-react-ui-kit';

const CD = ({ Title, Detail, Image }) => {
  return (
    
      <MDBCol md="3" sm="6" xs="0">
        <MDBCard>
          {/* <MDBCardImage  src={Image} position="top" alt="..." /> */}
          <MDBCardBody>
            <MDBCardTitle>{Title}</MDBCardTitle>
            <MDBCardText>{Detail}</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    
  );
};

export default CD;

CD.propTypes = {
  Title: PropTypes.string.isRequired,
  Detail: PropTypes.string.isRequired,
  Image: PropTypes.string,
};
