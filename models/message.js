const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        timestamp: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;