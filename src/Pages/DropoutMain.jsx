import ChatBot from "../Components/Bot"
import Navbar from "../Components/Navbar"
import Toster from "../Components/Toster"
import DropoutBarChart from "./Analyzed"
import EducationSchemes from "./Educationschemes"


const DropoutMain = () => {
  return (
    <div>
      <Navbar/><br/>
      
      <h3 style={{textAlign:"center",fontFamily:"sans-serif",color:"teal"}}>Model Analysis</h3><br/>
      <Toster/>
      <DropoutBarChart/>
      <EducationSchemes/>
      <ChatBot/>
    </div>
  )
}

export default DropoutMain
