1
import ChatBot from '../Components/Bot'
import Container from '../Components/Container'
import EducationChart from '../Components/EducationChart'

import HElement from '../Components/HEelement'
import Navbar from '../Components/Navbar'
import Toster from '../Components/Toster'

import SuccessStories from './SuccessStories'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Toster/>
      <Container/>
      <br/><br/><br/>
      <HElement/><br/><br/>
      <EducationChart/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <SuccessStories/><br/>
      <ChatBot/>
      
    </div>
  )
}

export default Home
