import express from "express";
import globalErrorHandler from "./middleware/globalErrorHanlder";

const app = express()

app.use(globalErrorHandler)

export default app