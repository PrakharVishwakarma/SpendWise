// /components/Pie.jsx
import "./Pie.css";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = () => {
  const { url, token } = useAuthentication();
  const [pieChartData, setPieChartData] = useState({
    labels: [
      "Housing",
      "Transportation",
      "Food",
      "Health Care",
      "Personal Care",
      "Debt",
      "Entertainment",
      "Lend",
      "Miscellaneous",
    ],
    datasets: [
      {
        label: "Your Category wise Expenditure",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.95)",
          "rgba(255, 206, 86, 0.935)",
          "rgba(75, 192, 192, 0.97)",
          "rgba(153, 255, 102, 0.9)",
          "rgba(255, 159, 64, 0.85)",
          "rgba(150, 233, 25, 0.98)",
          "rgba(201, 23, 191, 0.98)",
          "rgba(181, 150, 207, 0.98)",
        ],
        hoverOffset: 4,
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
          const dataa = res.data.current_month_expenses;
          setPieChartData({
            labels: [
              "Housing",
              "Transportation",
              "Food",
              "Health Care",
              "Personal Care",
              "Debt",
              "Entertainment",
              "Lend",
              "Miscellaneous",
            ],
            datasets: [
              {
                label: "Your Category wise Expenditure",
                data: [
                  dataa.Housing,
                  dataa.Transportation,
                  dataa.Food,
                  dataa["Health Care"],
                  dataa["Personal Care"],
                  dataa.Debt,
                  dataa.Entertainment,
                  dataa.Lend,
                  dataa.Miscellaneous,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.9)",
                  "rgba(54, 162, 235, 0.95)",
                  "rgba(255, 206, 86, 0.935)",
                  "rgba(75, 192, 192, 0.97)",
                  "rgba(153, 255, 102, 0.9)",
                  "rgba(255, 159, 64, 0.85)",
                  "rgba(150, 233, 25, 0.98)",
                  "rgba(201, 23, 191, 0.98)",
                  "rgba(181, 150, 207, 0.98)",
                ],
                hoverOffset: 4,
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
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Expenses Distribution",
      },
    },
  };

  return (
    <div className="pieChartBox">
      <Pie options={options} data={pieChartData} />
    </div>
  );
};

export default PieChart;
