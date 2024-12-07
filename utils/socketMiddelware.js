const jwt = require('jsonwebtoken');

const socketAuth = (socket, next) => {
    const token = socket.handshake.query.token;
    console.log(token) ;
    if (token) {
        try {
            const user = jwt.verify(token, 'secret');
            socket.user = user;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    } else {
        next(new Error('Authentication error'));
    }
};

module.exports = socketAuth;