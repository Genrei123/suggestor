import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import router from './routes/routes';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json())
const PORT = 3000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))



app.use("/get", router)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!")
})

app.listen(PORT, () => {
    console.log(`App is now listening to PORT ${PORT}`)
});