import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Firebase Config (Replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyC4VlMuZy5DJOEXSW2wTVL0I86wdWvtBGo",
  authDomain: "sda-1d615.firebaseapp.com",
  projectId: "sda-1d615",
  storageBucket: "sda-1d615.appspot.com",
  messagingSenderId: "191439868064",
  appId: "1:191439868064:web:32a68f90b522e59406f9c5",
  measurementId: "G-0Y0LNCJ27G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const OTPVerification = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    // Initialize reCAPTCHA when component mounts
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => console.log("reCAPTCHA verified!"),
    });
  }, []);

  const sendOTP = async () => {
    if (!phone.startsWith("+")) {
      alert("Please enter a valid phone number with country code (e.g., +911234567890)");
      return;
    }

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      alert("OTP sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(error.message);
    }
  };

  const verifyOTP = async () => {
    if (!confirmationResult) {
      alert("Please request an OTP first.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      alert("OTP Verified Successfully!");
    } catch (error) {
      alert("Invalid OTP!");
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <input
        type="text"
        placeholder="Enter phone number (e.g., +911234567890)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOTP}>Send OTP</button>
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOTP}>Verify OTP</button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OTPVerification;
