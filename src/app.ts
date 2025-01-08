import express from "express";
import globalErrorHandler from "./middleware/globalErrorHanlder";
import noteRoute from "./note/noteRoute";
import cors from 'cors'
import envConfig from "./config/config";

const app = express()

app.use(express.json()) //parse incoming json data

app.use(cors({
    origin: `${envConfig.frontendUrl}`
}))  // handle cors error

app.use('/api/notes',noteRoute)//Route

app.use(globalErrorHandler) //Error Hamdler

app.use(express.static('./src/uploads'))

export default app