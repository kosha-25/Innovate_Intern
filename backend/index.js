import express from "express"
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js"
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import {clientRouter} from "./Routes/ClientRoute.js"
dotenv.config();


const app = express();

connectDB();
app.use(cors())

app.use(express.json())

app.use('/auth', adminRouter)
app.use('/client', clientRouter)
app.listen(5000, ()=>{
    console.log("Server is running")
})