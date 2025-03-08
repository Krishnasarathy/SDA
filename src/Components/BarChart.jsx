import { ResponsiveBar } from '@nivo/bar';
import { motion } from 'framer-motion';
const dropoutPrimary = [0, 9.8, 0, 6, 8.6, 0, 5, 1.3, 0, 0];
const dropoutUpperPrimary = [7.3, 10.6, 4.6, 8.8, 0, 5, 4, 8, 1.6, 1.1];
const dropoutSecondary = [27.3, 21.7, 20.5, 20.3, 18, 17.9, 17.5, 17.2, 16.3, 14.7];

const data = [
  { category: 'Primary', ...dropoutPrimary.reduce((acc, value, index) => ({ ...acc, [`school_${index + 1}`]: value }), {}) },
  { category: 'Upper Primary', ...dropoutUpperPrimary.reduce((acc, value, index) => ({ ...acc, [`school_${index + 1}`]: value }), {}) },
  { category: 'Secondary', ...dropoutSecondary.reduce((acc, value, index) => ({ ...acc, [`school_${index + 1}`]: value }), {}) },
];

const DropoutBarChart = () => {
  return (
    <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    style={{ height: '500px' }}>
      <ResponsiveBar
        data={data}
        keys={['school_1', 'school_2', 'school_3', 'school_4', 'school_5', 'school_6', 'school_7', 'school_8', 'school_9', 'school_10']}
        indexBy="category"
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        padding={0.3}
        layout="horizontal"
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
        enableGridX={false}
        enableGridY={true}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'School ID',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Dropout Rate (%)',
          legendPosition: 'middle',
          legendOffset: -60,
        }}
      />
    </motion.div>
  );
};

export default DropoutBarChart;
