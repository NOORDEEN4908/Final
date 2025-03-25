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
} from "chart.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import './Akurana.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Akurana = () => {
  const [fromDate, setFromDate] = useState(dayjs().subtract(7, 'day'));
  const [toDate, setToDate] = useState(dayjs());
  const [labels, setLabels] = useState([]);
  const [rainfallData, setRainfallData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [windSpeedData, setWindSpeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const API_KEY = "a0088d4f317749ce83cbaefc353c706a0e47ae656af245afae6a27ce0ed1829a";
  const MAC_ADDRESS = "80:7D:3A:7C:4F:08";
  const API_URL = `https://api.ambientweather.net/v1/devices/${MAC_ADDRESS}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URL, {
          params: {
            apiKey: API_KEY,
            applicationKey: "97758ff2edb6495098ccdd68c4edaa2a818169ce80aa495092d64ab1a908d9ff",
            startDate: fromDate.format('YYYY-MM-DD'),
            endDate: toDate.format('YYYY-MM-DD'),
          },
        });

        console.log("API Response:", response.data);

        if (response.data && response.data.length > 0) {
          const data = response.data.map((item) => ({
            time: dayjs(item.dateutc).format("YYYY-MM-DD HH:mm"),
            rainfall: item.hourlyrainin || 0,
            humidity: item.humidity || 0,
            temperature: (item.tempf - 32) * (5 / 9), // Convert Fahrenheit to Celsius
            windSpeed: item.windspeedmph || 0,
          }));

          setLabels(data.map((entry) => entry.time));
          setRainfallData(data.map((entry) => entry.rainfall));
          setHumidityData(data.map((entry) => entry.humidity));
          setTemperatureData(data.map((entry) => entry.temperature));
          setWindSpeedData(data.map((entry) => entry.windSpeed));
        } else {
          setError("No data available for the selected date range.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [fromDate, toDate]);

  const createChartData = (data, label, borderColor, backgroundColor) => ({
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        fill: true,
        lineTension: 0.3,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Value" } },
    },
  };

  return (
    <div className="weather-graphs-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="date-picker-container">
          <IconButton onClick={() => setShowCalendar(!showCalendar)}>
            <CalendarTodayIcon />
          </IconButton>

          {showCalendar && (
            <div>
              <DateCalendar value={fromDate} onChange={setFromDate} />
              <DateCalendar value={toDate} onChange={setToDate} />
            </div>
          )}
        </div>
      </LocalizationProvider>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {rainfallData.length > 0 && (
        <div className="graph-box">
          <h2>Rainfall (Past Data)</h2>
          <Line data={createChartData(rainfallData, "Rainfall (mm)", "blue", "rgba(0, 0, 255, 0.2)")} options={chartOptions} />
        </div>
      )}

      {humidityData.length > 0 && (
        <div className="graph-box">
          <h2>Humidity (Past Data)</h2>
          <Line data={createChartData(humidityData, "Humidity (%)", "green", "rgba(0, 255, 0, 0.2)")} options={chartOptions} />
        </div>
      )}

      {temperatureData.length > 0 && (
        <div className="graph-box">
          <h2>Temperature (Past Data)</h2>
          <Line data={createChartData(temperatureData, "Temperature (°C)", "red", "rgba(255, 0, 0, 0.2)")} options={chartOptions} />
        </div>
      )}

      {windSpeedData.length > 0 && (
        <div className="graph-box">
          <h2>Wind Speed (Past Data)</h2>
          <Line data={createChartData(windSpeedData, "Wind Speed (m/s)", "orange", "rgba(255, 165, 0, 0.2)")} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default Akurana;
