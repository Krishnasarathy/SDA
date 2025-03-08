import  { useState } from 'react';


const DownloadUserPDF = () => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null); // State for error message

  const handleDownload = async () => {
    setError(null); // Clear any previous errors

    if (!mobile || isNaN(mobile)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    try {
      const response = await fetch(`/user/${mobile}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch PDF");
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `user_${mobile}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading PDF:", error);
      setError("Error downloading PDF: " + error.message); // Set the error message
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={handleDownload}>Download User PDF</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </div>
  );
};


// Removed propTypes as mobile is now managed internally
// DownloadUserPDF.propTypes = {
//   mobile: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
// };

export default DownloadUserPDF;