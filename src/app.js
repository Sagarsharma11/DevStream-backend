import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

// Use morgan to log requests in the 'dev' format
app.use(morgan('dev'));

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

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/videos", VideoRouter);

export { app }