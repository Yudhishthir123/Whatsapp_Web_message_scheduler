class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.data = null;
        this.statusCode = statusCode;
        this.statuscode = statusCode;
        this.error = errors;
        this.errors = errors;
        this.success = false;

        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

}

export { ApiError };