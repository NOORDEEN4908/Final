import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from "./Routes/userRoute.js";
import twilio from 'twilio'; 
import "dotenv/config";
import axios from 'axios';

// app config
const app=express();
const port= 4000;


// middleware
app.use(express.json());
app.use(cors()); // acces the back end from any fronend


const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_PHONE = process.env.TWILIO_PHONE;
const ALERT_PHONE = process.env.ALERT_PHONE;


const API_KEY = process.env.AMBIENT_API_KEY
const MAC_ADDRESS = process.env.MAC_ADDRESS; 
const API_URL = `https://api.ambientweather.net/v1/devices/${MAC_ADDRESS}`;


let rainfallData = [];

// Check rainfall every minute (adjust interval as needed)
const checkRainfallAndSendAlert = async () => {
    try {
        // Fetch real-time weather data from Ambient Weather API
        const response = await axios.get(API_URL, {
            params: {
                apiKey: API_KEY,
                applicationKey: process.env.AMBIENT_APP_KEY,
            },
        });

        const latestData = response.data[0];  // Assuming data is in the first element

        if (!latestData || typeof latestData.hourlyrainin === 'undefined') {
            console.log("No rainfall data available.");
            return;
        }

        const currentRainfall = latestData.hourlyrainin; // Rainfall for the current minute

        // Add the latest data to the rainfall data array
        rainfallData.push({
            timestamp: new Date(),
            rainfall: currentRainfall,
        });

        // Remove any data older than 2 hours (120 minutes)
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        rainfallData = rainfallData.filter((data) => new Date(data.timestamp) > twoHoursAgo);

        // Calculate total rainfall in the last 2 hours
        const totalRainfall = rainfallData.reduce((sum, data) => sum + (data.rainfall || 0), 0);
        console.log(`Total Rainfall in last 2 hours: ${totalRainfall} mm`);

        // If total rainfall exceeds 60 mm in the last 2 hours, send an SMS alert
        if (totalRainfall >= 60) {
            console.log("⚠️ Heavy Rainfall Detected! Sending Alert...");

            await twilioClient.messages.create({
                body: `🚨 ALERT: Heavy rainfall detected! 🌧️ Total Rainfall: ${totalRainfall} mm in the last 2 hours.`,
                from: TWILIO_PHONE,
                to: ALERT_PHONE,
            });

            console.log("Alert sent via SMS.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// Run the check every minute (60000 ms)
setInterval(checkRainfallAndSendAlert, 60000);

// API endpoint to manually check rainfall
app.get("/check-rainfall", async (req, res) => {
    try {
        // Fetch real-time weather data from Ambient Weather API
        const response = await axios.get(API_URL, {
            params: {
                apiKey: API_KEY,
                applicationKey: process.env.AMBIENT_APP_KEY,
            },
        });

        const latestData = response.data[0];

        if (!latestData || typeof latestData.hourlyrainin === 'undefined') {
            return res.json({ message: "No rainfall data available." });
        }

        const currentRainfall = latestData.hourlyrainin;

        res.json({ message: `Current Rainfall: ${currentRainfall} inches.` });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//db connection
connectDB();

app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Api working");
})







app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

//mongodb+srv://fectnoordeen:<db_password>@cluster0.wamfn.mongodb.net/?