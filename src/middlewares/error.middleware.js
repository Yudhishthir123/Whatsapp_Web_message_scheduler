const errorHandler = (err, req, res, next) => {
    const statuscode = err.statuscode || 500;

    res.status(statuscode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.error || [],
    });
};

export default errorHandler;