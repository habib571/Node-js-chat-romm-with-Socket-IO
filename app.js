
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoomsRoutes = require("./routes/chatRoomRoutes")
const http = require('http');
const socketIo = require('socket.io');
const socketAuth = require("./utils/socketMiddelware");
const { init } = require('./utils/socketInit');
const { handleSendMessage } = require('./controllers/messageController');


app.use(bodyParser.json());
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};
connectDB()
const server = http.createServer(app);
const io = init(server);
io.use(socketAuth);
io.on('connection', (socket) => {
    socket.on('sendMessage', (data) => {
        handleSendMessage(io, socket, data)

    });
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');

    });
});
app.use('/auth' ,authRoutes)
app.use('/users' ,userRoutes)
app.use("/chats" ,chatRoomsRoutes)
const PORT =  8000;
server.listen(PORT,() => console.log(`Server running on port ${PORT}`));