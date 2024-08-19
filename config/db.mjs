import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI)


export default mongoose