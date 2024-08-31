import { app } from "./app.js";
import { connectDB } from "./config/mongoDB.js";
import { config } from "./config/index.js";

async function main() {
    try {
        await connectDB();
        const { PORT } = config;
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("MONGO db connection failed !!! ",error);
    }
}

main();