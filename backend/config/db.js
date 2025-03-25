import mongoose, { connect } from "mongoose";



 export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://DEEN:DEEN@cluster0.ojafr.mongodb.net/flood').then(()=>console.log("DB Connected"));
} 

//