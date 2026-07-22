const validate = (schema, property = "body") => {
    return (req, res, next) => {

        const { error } = schema.validate(req[property], {
            abortEarly: false
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }

        next();
    };
};

module.exports = validate;
