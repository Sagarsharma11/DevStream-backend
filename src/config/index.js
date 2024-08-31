import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

const config = {
    PORT: process.env.PORT,
    MONGO_CONNECTION_STRING:process.env.MONGO_URI
}

export {config}