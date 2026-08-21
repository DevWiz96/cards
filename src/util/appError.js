class AppError extends Error
{
    constructor(message,statusCode, errorCode)
    {
        super(message)
        this.statusCode = statusCode // Default status code 400,401,500
        this.errorCode = errorCode // Custom error ie's AUTH_001
    }
}
module.exports = AppError