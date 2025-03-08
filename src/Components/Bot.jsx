import { useState } from "react";
import axios from "axios"; // Import axios for API requests
import "../assets/CSS/bot.css"; // Import your CSS file
import botLogo from "../assets/Images/bot.gif"; // Bot icon

function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "KS", text: "Greetings! How are you doing today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Typing...");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  



  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "You", text: message };
    setChatHistory([...chatHistory, userMessage]);
    setMessage("");
    setIsLoading(true);
    setLoadingText("Typing...");

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", { message });
      const botMessage = { sender: "KS", text: response.data.response };
      setChatHistory((prevChat) => [...prevChat, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prevChat) => [
        ...prevChat,
        { sender: "KS", text: "Sorry, there was an issue connecting." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="chatbot-container">
      <div className="chatbot-icon" onClick={toggleChat}>
        <img src={botLogo} alt="Chatbot Icon" className="chatbot-logo" />
      </div>

      {isChatOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>KS</span>
            <button onClick={toggleChat} className="close-btn">&times;</button>
          </div>
          <div className="chatbot-messages">
            {chatHistory.map((msg, index) => (
              <div key={index} className={msg.sender === "You" ? "user-message" : "bot-message"}>
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bot-message loading">
                <strong>KS:</strong> <span className="loading-text">{loadingText}</span>
              </div>
            )}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} disabled={isLoading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
