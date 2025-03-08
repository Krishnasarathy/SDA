import ChatBot from "../Components/Bot"


import Navbar from "../Components/Navbar"
import StudentForm from "../Components/StudentForm"


import Toster from "../Components/Toster"


const Financial = () => {
  return (
    <div>
      <Navbar/>
      <Toster/>
      <ChatBot/><br/><br/>
      <h3 style={{textAlign:"center",fontFamily:"sans-serif",color:"green"}}>Kindly provide the necessary details for contact</h3>
      <br/><br/>
      <StudentForm/>
      <br/><br/><br/><br/>
      
      
      
      
      
      
    </div>
  )
}

export default Financial
