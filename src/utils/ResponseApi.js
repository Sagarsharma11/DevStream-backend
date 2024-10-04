class ResponseApi {
    constructor(res) {
        this.res = res; 
    }
    success(message, data = null, statusCode = 200) {
        const response = {
            status: "success",
            message,
            statusCode,
            success: true,
            data,
            error: null,
        };
        return this.res.status(statusCode).json(response); 
    }
    error(message, error = null, statusCode = 500) {
        const response = {
            status: "error",
            message,
            statusCode,
            success: false,
            data: null,
            error,
        };
        return this.res.status(statusCode).json(response); 
    }
}

export default ResponseApi;
