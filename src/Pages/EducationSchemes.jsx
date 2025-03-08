import { useState } from 'react';
import '../assets/CSS/ed.css'

const EducationSchemes = () => {
  const [schemes, setSchemes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSchemes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/schemes');
      if (!response.ok) {
        throw new Error('Failed to fetch schemes');
      }
      const data = await response.json();
      setSchemes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="centered-btn">
        <button onClick={fetchSchemes} className="btn btn-primary">
          Get Education Schemes
        </button>
      </div>
      
      {loading && <div className="loading">Loading...</div>}

      {error && <div className="error">{error}</div>}

      {schemes && (
        <div className="schemes-box">
          {Object.keys(schemes).map((category, index) => (
            <div key={index} className="category">
              <h3 style={{color:"green",fontWeight:"bolder",fontFamily:"monospace"}}>{category}</h3>
              <ul style={{fontWeight:"bold"}}>
                {schemes[category].map((scheme, idx) => (
                  <li key={idx}>{scheme}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationSchemes;
