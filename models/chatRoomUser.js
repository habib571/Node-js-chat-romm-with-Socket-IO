const mongoose = require('mongoose');
const chatUsersSchema = new mongoose.Schema({
    chatRoomId: { type: String, required: true },
    userId: { type: String, required: true },
     isAdmin :{type :Boolean} ,
    joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatUser', chatUsersSchema);