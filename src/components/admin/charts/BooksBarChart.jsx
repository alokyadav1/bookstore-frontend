/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function BooksPieChart({ inputData, role }) {
  const categories = {}

  inputData?.forEach(book => {
    categories[book.category] = (categories[book.category] || 0) + 1;
  })
  console.log("categories", categories);

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Count",
        data: Object.values(categories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#AA00FF",
          "#00FFAA",
          "#FFAA00",
        ],
        borderWidth: 1,
        borderColor: "#FFFFFF",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Books by category`,
      },
      legend: {
        display: true, // Display legend for the pie chart
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
  return <Pie data={data} options={options} />;
}

export default BooksPieChart;
