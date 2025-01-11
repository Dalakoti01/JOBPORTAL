import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db/index.js"
dotenv.config({}) // agar ye step nahi likhoge toh kaam nahi karegi koi env file
import userRouter from "./routes/user.route.js"
import companyRouter from "./routes/company.routes.js"
import jobRouter from "./routes/job.routes.js"
import applicationRouter from "./routes/application.routes.js"

const app = express()


// http://localhost:8000/api/vi/user/

//MIDLEWARE

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials : true
}))

//routes
app.use("/api/v1/user",userRouter)
app.use("/api/v1/company",companyRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server running at port ${PORT}`);
    
})
