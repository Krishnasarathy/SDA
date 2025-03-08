import CD from "../Components/CD"
import '../assets/CSS/bk.css'
import { motion } from 'framer-motion';
const SuccessStories = () => {
  return (
    <>
    <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    >
    <h1 style={{textAlign:"center",color:"green"}}>Success Stories</h1>
    </motion.div>
    <motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.6, ease: "easeOut" }} style={{display:"flex"}} className="bk">

    <CD Title="Dr. A.P.J. Abdul Kalam" 
    Detail="Journey from a struggling student selling newspapers to becoming the President of India and a globally respected scientist is a true inspiration for students facing poverty and hardships"

    />
    <CD Title=" Mahendra Singh Dhoni" 
    Detail="Dhoni worked as a Railways Ticket Examiner during the years 2000 to 2003 and was selected for the Indian Cricket Team in the year 2004. Today Mahendra Singh Dhoni is the captain of Indian Cricket Team in all three forms of the game, and his records are the best among all Indian captains to date."
    />
    <CD Title=" Kalpana Chawla" 
    Detail="The first Indian woman in space and a role model for those who dream of shattering glass barriers and shooting for the stars, Kalpana Chawla’s achievements have, without a doubt, made India proud"
    />
    
    </motion.div>
    </>

    
  )
}

export default SuccessStories
