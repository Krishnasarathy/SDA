import { Panel } from 'rsuite';
import PropTypes  from "prop-types";
const Success = ({name,detail,Image}) => (
  
  <Panel shaded bordered bodyFill style={{width: 220 ,backgroundColor:"white"}}>
    <img src={Image} height="200" />
    <Panel style={{color:"#333a70"}} header={name}>
    
      <p style={{color:"#333a70"}}>
        <small>
          {detail}
        </small>
      </p>
    </Panel>
  </Panel>
);
export default Success

Success.propTypes={
  name:PropTypes.string.isRequired,
  detail:PropTypes.string.isRequired,
  Image:PropTypes.string,

}