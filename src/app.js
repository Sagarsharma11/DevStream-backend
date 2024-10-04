import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;
const app = express();

// Morgan Settings
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
const customFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(customFormat));

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({
    limit: "1MB"
}))

app.use(express.urlencoded({
    limit: "1MB",
    extended: true
}))

// Home Route 
 
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello World!"
    })
})

// Routes
import UserRouter from "./routes/user.route.js";
import VideoRouter from "./routes/video.route.js";

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/videos", VideoRouter);

export { app }