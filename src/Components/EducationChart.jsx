import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { motion } from 'framer-motion';
const data = [
  { id: 'primary', label: 'Primary', value: 7.3 },
  { id: 'upper-primary', label: 'Upper Primary', value: 10.6 },
  { id: 'secondary', label: 'Higher Secondary', value: 20.5 },
];
const dropoutPrimary = [0, 9.8, 0, 6, 8.6, 0, 5, 1.3, 0, 0];
const dropoutUpperPrimary = [7.3, 10.6, 4.6, 8.8, 0, 5, 4, 8, 1.6, 1.1];
const dropoutSecondary = [27.3, 21.7, 20.5, 20.3, 18, 17.9, 17.5, 17.2, 16.3, 14.7];

// Calculate average dropout rates for each category
const bardata = [
  { category: 'Primary', dropoutRate: dropoutPrimary.reduce((sum, value) => sum + value, 0) / dropoutPrimary.length },
  { category: 'Upper Primary', dropoutRate: dropoutUpperPrimary.reduce((sum, value) => sum + value, 0) / dropoutUpperPrimary.length },
  { category: 'Higher Secondary', dropoutRate: dropoutSecondary.reduce((sum, value) => sum + value, 0) / dropoutSecondary.length },
];

const EducationChart = () => (
  <motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
   style={{ width: '100%', height: 400 }}>
            <ResponsiveBar
        data={bardata}
        keys={['dropoutRate']}
        indexBy="category"
        margin={{ top: 40, right: 40, bottom: 60, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        borderRadius={3}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        theme={{
          tooltip: {
            container: {
              background: '#fff',
              color: '#333',
              fontSize: '13px',
              borderRadius: '4px',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
              padding: '10px',
            },
          },
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Category',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Dropout Rate (%)',
          legendPosition: 'middle',
          legendOffset: -50,
        }}
      />




    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'nivo' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      enableArcLinkLabels={false}
      enableArcLabels={true}
      arcLabel="label"
      theme={{
        tooltip: {
          container: {
            background: '#fff',
            color: '#333',
            fontSize: '13px',
            borderRadius: '4px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '10px',
          },
        },
      }}
    />
         

  
    
  </motion.div>
);

export default EducationChart;
