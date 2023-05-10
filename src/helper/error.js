class AppError extends Error {
    constructor(stateCode, message) {
        super(message);
        this.stateCode = stateCode;
    }
}

const handleError = (err,req,res,next) => {
    if(!(err instanceof AppError)) {
        err = new AppError(500, "Internal server");
    }

    const { message, stateCode } = err;
    res.status(stateCode).json({
        status : "error",
        message : message,
    });

    next();
}

module.exports = {
    AppError,
    handleError
}