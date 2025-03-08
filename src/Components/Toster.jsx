import  { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toster = () => {
  useEffect(() => {
    // Show toast when the page loads
    toast("If you need any assistance, KS is here to help. Simply click below to get started. 😊");

    // Set interval to show the toast every 10 minutes
    const intervalId = setInterval(() => {
      toast("Looking for help KS is here click below to get started.😊");
    }, 50*60 * 1000); // 10 minutes in milliseconds

    // Cleanup on component unmount to clear the interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Toster;
