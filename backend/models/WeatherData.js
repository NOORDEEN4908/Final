import mongoose from "mongoose";

const WeatherDataSchema = new mongoose.Schema({
  dateutc: { type: Date, required: true },  // Timestamp of the data
  hourlyrainin: { type: Number, default: 0 }, // Rainfall (in inches or mm)
  humidity: { type: Number, default: 0 },  // Humidity percentage
  tempf: { type: Number }, // Temperature in Fahrenheit (convert to Celsius in backend)
  windspeedmph: { type: Number, default: 0 }, // Wind speed in mph
});

// Create & export the model
export const WeatherData = mongoose.model("WeatherData", WeatherDataSchema);
