const ChatRoom = require('../models/chatRoom');
const ChatRoomUser = require('../models/chatRoomUser');
const  customResponse = require("../utils/response")
const User = require("../models/user");
const { getIO } = require('../utils/socketInit');
const Message = require("../models/message");
exports.handleSendMessage = async (io, socket, data) => {
        try {
            const { chatRoomId, content } = data;
            const senderId = socket.user.id
            const message = new Message({
                chatRoomId,
                senderId,
                content,
            });
            await message.save();
            console.log("sockeee" + socket.user);
            const chatRoomUsers = await ChatRoomUser.findById(chatRoomId )  ;
             chatRoomUsers.forEach((user) => {
                 if (user.userId !== senderId) {
                     io.to(chatRoomId).emit('newMessage', {
                         id: message._id,
                         chatRoomId: chatRoomId ,
                         senderId: senderId ,
                         content: content
                     });
                 }

             })

            console.log(`Message sent in room ${chatRoomId}: ${content}`);
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', { message: 'Failed to send message' });
        }


}
exports.getChatRoomMessages = async (req, res) => {
    try {
        const { chatRoomId } = req.params;
        console.log("chatRoomId", chatRoomId);
        if (!chatRoomId) {
            return customResponse(res, 400, "Chat Room ID is required", null);
        }

        const messages = await Message.find({ chatRoomId })
            .sort({ timestamp: 1 })
            .exec();

        return customResponse(res, 200, "Messages retrieved successfully", messages);
    } catch (error) {
        console.error("Error fetching chat room messages:", error);
        return customResponse(res, 500, "Internal server error", null);
    }
};