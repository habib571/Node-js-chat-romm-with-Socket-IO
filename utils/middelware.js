const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as needed
const  customResponse = require("../utils/response")
const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return customResponse(res , 401, "unauthorized")
        }

        const token = authHeader.split(' ')[1]; // Extract token
        const decoded = jwt.verify(token, 'secret'); // Use your secret key
        console.log(decoded)
        // Attach the user ID or email to the request object
        req.user = { id: decoded.id, email: decoded.email };

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return customResponse(res , 401, "unauthorized")
    }
};


module.exports = authenticateUser;