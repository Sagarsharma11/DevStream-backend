import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); 
    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Access denied.",
            statusCode: 401,
            success: false,
            data: null,
            error: "Unauthorized access",
        });
    }

    try {
        const decoded = jwt.verify(token, "JWT_SECRET"); 
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(403).json({
            status: "error",
            message: "Invalid token.",
            statusCode: 403,
            success: false,
            data: null,
            error: "Forbidden access",
        });
    }
};

export default authMiddleware;
