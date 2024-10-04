import { User } from "../models/user.model.js";
import ResponseApi from "../utils/ResponseApi.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return new ResponseApi(res).error("Email or Password are required");
        const user = await User.findOne({ email });
        if (!user) return new ResponseApi(res).error("Invalid credentials");
        if ( await bcrypt.compare(user.password,password)) return new ResponseApi(res).error("Invalid credentials")
        const token = jwt.sign({ id: user._id, email: user.email }, "JWT_SECRET",  { expiresIn: '1h' })
        return new ResponseApi(res).success("User logged in successfully!", { token });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            statusCode: 500,
            message: "Internal Server Error, while registering the user",
        })
    }
}

const userRegister = async (req, res) => {
    try {
        const { email, fullName, avatar, coverImage, password } = req.body;
        const user = await User.create({
            email,
            fullName,
            avatar,
            coverImage,
            password
        });

        res.status(201).json({
            statusCode: 201,
            message: "User registered successfully!",
            data: user
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({
            statusCode: 500,
            message: "Internal Server Error, while registering the user",
        })
    }
}

export { userLogin, userRegister }