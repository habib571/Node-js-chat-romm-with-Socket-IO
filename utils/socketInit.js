const { Server } = require('socket.io');
let io;

module.exports = {
    init: (server) => {
        io = new Server(server, {
            cors: {
                origin: '*', // Adjust this to match your client's origin
                methods: ['GET', 'POST'],
            },
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    },
};