const response = (response, status, message, data = null) => {
    return response.status(status).json({
        message,
        data,
    });
};

module.exports = response;