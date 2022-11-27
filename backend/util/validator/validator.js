const validator = (schema, property) => {
    return (req, res, next) => {
        const { value, error } = schema.validate(req[property]);
        const valid = error == null;
        if (valid) {
            req[property] = value;
            next();
        }
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(',')
            const err = new Error(message);
            err.statusCode = 400;
            throw err;
        }
    }
}

module.exports = validator;