
import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
import "./Line.css"
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = () => {
  const { url, token } = useAuthentication();
  const [lineChartData, setLineChartData] = useState({
    labels: [ // Corrected from 'lebels' to 'labels'
      "Monday",
      "Tuesday",
      "Wednesday", // Corrected spelling
      "Thursday", // Corrected spelling
      "Friday", // Corrected spelling
      "Saturday", // Corrected spelling
      "Sunday",
    ],
    datasets: [
      {
        label: "Your Every Day Expenditure",
        data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
        borderColor: "rgb(75,192,192)",
        fill: false, // Added to specify not to fill below the line
      },
    ],
  });

  useEffect(() => {
    const handleSubmit = async (e) => {
      await axios({
        url: url + "/tag_based_expenses_analysis",
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
        data: {},
      })
        .then((res) => {
          console.log(res.data);
          // const dataa = res.data.current_month_expenses;
          setLineChartData({
            labels: [ // Corrected from 'lebels' to 'labels'
              "Monday",
              "Tuesday",
              "Wednesday", // Corrected spelling
              "Thursday", // Corrected spelling
              "Friday", // Corrected spelling
              "Saturday", // Corrected spelling
              "Sunday",
            ],
            datasets: [
              {
                label: "Your Every Day Expenditure",
                data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
                borderColor: "rgb(75,192,192)",
                fill: false, // Added to specify not to fill below the line
              },
            ],
          });
        })
        .catch((err) => {
          console.error("Error adding expense:", err);
        });
    };

    handleSubmit();
  }, [token, url]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Steps',
      },
    },
  };

  return (
    <div className='lineChartBox'>
      <Line options={options} data={lineChartData} />;
    </div>
  );

};

export default LineChart;
