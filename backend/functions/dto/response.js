class Response {
    constructor(success, message, data) {
        this.success = success || false;
        this.message = message;
        this.data = data;
    }
}

module.exports = Response;
