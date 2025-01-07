import express from "express";
import globalErrorHandler from "./middleware/globalErrorHanlder";
import noteRoute from "./note/noteRoute";

const app = express()

app.use(express.json())

app.use('/api/notes',noteRoute)
app.use(globalErrorHandler)

app.use(express.static('./src/uploads'))

export default app