import Plot from "react-plotly.js";

const DropoutPieChart = () => {
  const data = [
    {
      values: [7.3, 10.6, 20.5], // Replace with average or calculated values
      labels: ["Primary", "Upper Primary", "Secondary"],
      type: "pie",
      hole: 0.4,
      marker: {
        colors: ["#ff9999", "#66b3ff", "#99ff99"],
      },
    },
  ];

  return (
    <Plot
      data={data}
      layout={{
        title: "Overall Dropout Rates",
        height: 400,
        width: 500,
      }}
    />
  );
};

export default DropoutPieChart;
