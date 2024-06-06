import React from 'react'
import PieChart from './Analysis/Pie';
import BarChart from './Analysis/Bar';
import LineChart from './Analysis/Line';

function Analysis() {
  return (
  <div className="main-dashboard-container">
      <PieChart />
      <BarChart />
      <LineChart/>

  </div>
  );
}

export default Analysis 