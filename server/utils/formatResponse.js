const formatResponse = (res, {statusCode, message, data}) => {
    const response = {
        message: message,
    };
    
    if (data) {
        response.data = data;
    }
    
    res.status(statusCode).json(response);
}
module.exports = formatResponse;