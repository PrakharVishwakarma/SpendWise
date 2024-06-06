import { Bar } from 'react-chartjs-2';
import "./Bar.css"
import React, { useEffect, useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const BarChart = () => {
    const {url, token} = useAuthentication();
    const [barChartData, setBarChartData] = useState({
            labels: [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            datasets: [
                {
                    label: "Your Monthly Expenditure",
                    data: [33000, 55000, 45500, 66000, 85000, 71000, 90000, 45213, 65433, 34334, 54653, 53354],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.7)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.65)",
                        "rgba(75, 192, 192, 0.75)",
                        "rgba(153, 255, 102, 0.72)",
                        "rgba(255, 159, 64, 0.68)",
                        "rgba(201, 203, 207, 0.62)",
                        "rgba(201, 23, 191, 0.98)",
                        "rgba(181, 150, 207, 0.98)",
                        "rgba(81, 250, 107, 0.8)",
                        "rgba(51, 150, 207, 0.85)",
                        "rgba(181, 50, 107, 0.89)"
                    ],
                    borderColor: [
                        "rgba(181, 150, 207, 0.98)",
                        "rgba(81, 250, 107, 0.8)",
                        "rgba(51, 150, 207, 0.85)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(51, 150, 207, 0.85)",
                        "rgba(181, 50, 107, 0.89)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 255, 102, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(201, 203, 207, 1)"
                    ],
                    borderWidth: 1,
                },
            ],
        }
    );


    useEffect(() => {
        const handleSubmit = async (e) => {
          await axios({
            url: url + "/expenses_by_month",
            method: "GET",
            headers: {
              authorization: "Bearer " + token,
            },
            data: {},
          })
            .then((res) => {
              console.log(res.data);
              const dataa = res.data;
              setBarChartData({
                labels: [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ],
                datasets: [
                    {
                        label: "Your Monthly Expenditure",
                        data: [dataa.January, dataa.February, dataa.March, dataa.April, dataa.May, dataa.June, dataa.June.July, dataa.August, dataa.September, dataa.October, dataa.November, dataa.December],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.7)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.65)",
                            "rgba(75, 192, 192, 0.75)",
                            "rgba(153, 255, 102, 0.72)",
                            "rgba(255, 159, 64, 0.68)",
                            "rgba(201, 203, 207, 0.62)",
                            "rgba(201, 23, 191, 0.98)",
                            "rgba(181, 150, 207, 0.98)",
                            "rgba(81, 250, 107, 0.8)",
                            "rgba(51, 150, 207, 0.85)",
                            "rgba(181, 50, 107, 0.89)"
                        ],
                        borderColor: [
                            "rgba(181, 150, 207, 0.98)",
                            "rgba(81, 250, 107, 0.8)",
                            "rgba(51, 150, 207, 0.85)",
                            "rgba(255, 99, 132, 1)",
                            "rgba(51, 150, 207, 0.85)",
                            "rgba(181, 50, 107, 0.89)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 255, 102, 1)",
                            "rgba(255, 159, 64, 1)",
                            "rgba(201, 203, 207, 1)"
                        ],
                        borderWidth: 1,
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
                text: 'Weekly Expenses',
            },
        },
    };

    return (
        <div className='barChartBox'>
            <Bar options={options} data={barChartData} />;
        </div>
    );
};

export default BarChart;