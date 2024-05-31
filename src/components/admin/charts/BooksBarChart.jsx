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
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend);

function BooksBarChart({ inputData, role }) {
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
        backgroundColor: "#AA00FF",
        barThickness:30,
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
        display: false, // Hide legend for a cleaner look
      },
    },
    cornerRadius: 40, // Reduce border radius for a more subtle effect
    borderWidth: 1, // Increase border width for a bolder appearance
    borderColor: "#FFFFFF", // Set border color to white for contrast
    
    
  };
  return <Bar data={data} options={options} />;
}

export default BooksBarChart;

