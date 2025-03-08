import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { motion } from "framer-motion";
import EducationSchemes from "./Educationschemes";

const DropoutBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/predict")
      .then((response) => response.json())
      .then((data) => {
        if (data.top_10_features && data.feature_percentages) {
          const formattedData = data.top_10_features.map((feature, index) => ({
            category: feature,
            percentage: parseInt(data.feature_percentages[index], 10),
          }));
          setChartData(formattedData);
          setFeatures(data.top_10_features); // Store features separately
        }
      })
      .catch((error) => console.error("Error fetching analytics:", error));
  }, []);

  const handleAnalyze = () => {
    fetch("http://127.0.0.1:5001/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: features }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Analysis Result:", data))
      .catch((error) => console.error("Error analyzing data:", error));
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ height: "500px", width: "100%" }}
    >
      <ResponsiveBar
        data={chartData}
        keys={["percentage"]}
        indexBy="category"
        margin={{ top: 40, right: 30, bottom: 80, left: 80 }}
        padding={0.3}
        layout="vertical"
        colors={{ scheme: "set1" }}
        borderRadius={3}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableLabel={true}
        theme={{
          tooltip: {
            container: {
              background: "#fff",
              color: "#333",
              fontSize: "13px",
              borderRadius: "4px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              padding: "10px",
            },
          },
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Dropout Reasons",
          legendPosition: "middle",
          legendOffset: 50,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Impact (%)",
          legendPosition: "middle",
          legendOffset: -70,
        }}
      />
     <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  }}
>
  
</div>
    
    </motion.div>
  );
};

export default DropoutBarChart;
