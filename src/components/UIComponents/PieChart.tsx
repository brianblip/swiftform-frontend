import React from 'react';

interface DataPoint {
  value: number;
  color: string;
}

interface Props {
  data: DataPoint[];
}

const PieChart: React.FC<Props> = ({ data }) => {
  // Calculate total value of all data points
  const totalValue = data.reduce((acc, { value }) => acc + value, 0);

  // Function to calculate the angle for a given data point
  const calculateAngle = (value: number) => (value / totalValue) * 360;

  // Function to generate SVG path data for a given data point
  const getPathData = (startAngle: number, endAngle: number) => {
    const x1 = Math.cos((Math.PI / 180) * startAngle) * 100;
    const y1 = Math.sin((Math.PI / 180) * startAngle) * 100;
    const x2 = Math.cos((Math.PI / 180) * endAngle) * 100;
    const y2 = Math.sin((Math.PI / 180) * endAngle) * 100;
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return `M 0 0 L ${x1} ${y1} A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Generate individual pie slices
  let cumulativeAngle = 0;
  const pieSlices = data.map(({ value, color }, index) => {
    const startAngle = cumulativeAngle;
    const endAngle = startAngle + calculateAngle(value);
    cumulativeAngle = endAngle;

    return (
      <path
        key={index}
        d={getPathData(startAngle, endAngle)}
        fill={color}
      />
    );
  });

  const svgWidth = 300;
  const svgHeight = 300;

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
        {pieSlices}
      </g>
    </svg>
  );
};

export default PieChart;
