import PropTypes from "prop-types";

const Postforanalyze = ({ data }) => {
  const handleAnalyze = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5001/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: JSON.stringify(data) }), // Send as JSON
      });

      const result = await response.json();
      console.log("Analysis Result:", result.solution); // Log the response
      
    } catch (error) {
      console.error("Error analyzing data:", error);
    }
  };

  return (
    <div>
      <h2>Top 10 Dropout Factors</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.category}: {item.percentage}%
          </li>
        ))}
      </ul>
      <button onClick={handleAnalyze}>Analyze with AI</button>
    </div>
  );
};

// Add PropTypes validation
Postforanalyze.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Postforanalyze;
