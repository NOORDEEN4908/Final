import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import "./WeatherGraphs.css";

// Register Chart.js components
ChartJS.register(Filler, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import "./WeatherGraphs.css";

const WeatherGraphs = ({ city }) => {
  const [labels, setLabels] = useState([]);
  const [rainfallData, setRainfallData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [windSpeedData, setWindSpeedData] = useState([]);
  const apiKey = "2febae47135f879377604dfd6ab516a2"; // Your OpenWeather API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );

        const today = new Date(); // Current date and time
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Add 1 day to get tomorrow

        const formatDate = (date) => date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

        const todayStr = formatDate(today); // Format for today
        const tomorrowStr = formatDate(tomorrow); // Format for tomorrow

        const data = response.data.list
          .slice(0, 16) // Limit to 48 hours of data (16 intervals for 48 hours)
          .map((entry) => ({
            time: entry.dt_txt, // Full timestamp (YYYY-MM-DD HH:mm:ss)
            rainfall: entry.rain ? entry.rain["3h"] || 0 : 0, // Rainfall for the 3-hour interval
            humidity: entry.main.humidity, // Humidity
            temperature: (entry.main.temp - 273.15).toFixed(2), // Convert Kelvin to Celsius
            windSpeed: entry.wind.speed, // Wind speed
          }));

        // Convert to 12-hour format with AM/PM for labels, adding date (Today or Tomorrow)
        const formatTime = (timeStr) => {
          const date = new Date(timeStr);
          let hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
          return formattedTime;
        };

        const formatLabel = (timeStr) => {
          const date = new Date(timeStr);
          const dateStr = date.toISOString().split("T")[0];
          const time = formatTime(timeStr);
          return dateStr === todayStr
            ? `Today - ${time}`
            : dateStr === tomorrowStr
            ? `Tomorrow - ${time}`
            : time;
        };

        setLabels(data.map((entry) => formatLabel(entry.time))); // Format the time and add "Today" or "Tomorrow"
        setRainfallData(data.map((entry) => entry.rainfall));
        setHumidityData(data.map((entry) => entry.humidity));
        setTemperatureData(data.map((entry) => entry.temperature));
        setWindSpeedData(data.map((entry) => entry.windSpeed));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]); // Watch for changes in city

  const createChartData = (data, label, borderColor, backgroundColor) => ({
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        fill: true,
        lineTension: 0.3, // Optional: add some smoothness to the line
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (Next 48 hours)", // Label indicating next 48 hours
        },
      },
      y: {
        title: {
          display: true,
          text: "Value", // Y-axis label
        },
      },
    },
  };

  return (
    <div className="weather-graphs-container">
      {rainfallData.length > 0 && (
        <div className="graph-box">
          <h2>Rainfall (Next 48 hours)</h2> {/* Updated title */}
          <Line data={createChartData(rainfallData, `Rainfall in ${city} (mm)`, "blue", "rgba(0, 0, 255, 0.2)")} />
        </div>
      )}
      {humidityData.length > 0 && (
        <div className="graph-box">
          <h2>Humidity (Next 48 hours)</h2> {/* Updated title */}
          <Line data={createChartData(humidityData, `Humidity in ${city} (%)`, "green", "rgba(0, 255, 0, 0.2)")} options={chartOptions} />
        </div>
      )}
      {temperatureData.length > 0 && (
        <div className="graph-box">
          <h2>Temperature (Next 48 hours)</h2> {/* Updated title */}
          <Line data={createChartData(temperatureData, `Temperature in ${city} (°C)`, "red", "rgba(255, 0, 0, 0.2)")} options={chartOptions} />
        </div>
      )}
      {windSpeedData.length > 0 && (
        <div className="graph-box">
          <h2>Wind Speed (Next 48 hours)</h2> {/* Updated title */}
          <Line data={createChartData(windSpeedData, `Wind Speed in ${city} (m/s)`, "orange", "rgba(255, 165, 0, 0.2)")} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default WeatherGraphs;
