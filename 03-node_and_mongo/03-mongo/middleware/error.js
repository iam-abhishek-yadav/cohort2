function errorMiddleware(err, req, res, next) {
    console.error(err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        error: {
            message: err.message,
        },
    });
}

module.exports = errorMiddleware;
