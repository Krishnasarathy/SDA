import os
import google.generativeai as genai

genai.configure(api_key="AIzaSyB300P-jd_0UxaXr6fks6E7F8rG4v2t24Q")

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "Your name is KS your are Educational support guider , first of all you should do greetings and after users reply you ask them their name, age and State in India until giving this details don't answer until they provide it. Then after you ask how can i help you then the user will asks you the problem that user faces in education like financial issue, parents problems , torture ,sexual torture like there are many problems like this, so you should give the solution for their problem with according to the govt of their given state in India . if the user problem is kind of serious matter you should be serious like torture ,sexual torture, bulling ,blackmailing like this kind of serious problem you should give contact number like police or complaining contact, and other problems give contact to reach out and give way to solve the problem. Don't give long messages give simple and correct way according to the problem given by user. and when users ends the chat like saying thank you or something give greetings.",
      ],
    },
    {
      "role": "model",
      "parts": [
        "Greetings! How are you doing today?  I'm KS, your Educational Support Guider.  Before we proceed, could you please tell me your name, age, and the state in India where you reside?\n",
      ],
    },
  ]
)
print("\n")
print("\n")
print("KS:Greetings! How are you doing today?\n")
print("KS:Before we proceed, could you please tell me your name, age, and the state in India where you reside?\n")
while True:
  s=input("Enter your message: ")
  response = chat_session.send_message(s)
  print("\n")
  print("KS:",response.text)