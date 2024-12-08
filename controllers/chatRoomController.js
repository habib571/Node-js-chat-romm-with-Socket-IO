const ChatRoom = require('../models/chatRoom');
const  customResponse = require("../utils/response")
const chatRoomToken  =require("../utils/chatRoom-token")
const User = require("../models/user");
const  ChatRoomUser = require("../models/chatRoomUser")
exports.createRoom =async(req, res) => {
    try {
        const { name , imageUrl} = req.body ;
        const chatRoom = new ChatRoom({name,token: chatRoomToken ,imageUrl , adminId :req.user.id})
        console.log(req.user.id) ;
         await chatRoom.save() ;
         const chatRoomUser  = await  new ChatRoomUser( { chatRoomId :chatRoom._id ,  userId : req.user.id, isAdmin :true}) ;
         await  chatRoomUser.save() ;
           return customResponse(res ,200 , "created !" , chatRoom) ;

    } catch(e) {
        console.log(e)
        return customResponse(res ,400 , "  Internal server error", null) ;

    }
}


exports.getMyChatRooms = async (req, res) => {
    try {
        const userChatRooms = await ChatRoomUser.find({ userId : req.user.id} ).select('chatRoomId');
        const chatRoomIds = userChatRooms.map((chatUser) => chatUser.chatRoomId);
        const joinedChatRooms = await ChatRoom.find({ _id: { $in: chatRoomIds } });

        return customResponse(res, 200, 'Chat rooms fetched successfully', joinedChatRooms);

    } catch (err) {
        console.error(err);
        return customResponse(res, 500, 'Internal server error');
    }
};

exports.joinRoom = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return customResponse(res, 400, 'Token is required', null);
        }

        const chatRoom = await ChatRoom.findOne({ token });
        if (!chatRoom) {
            return customResponse(res, 404, 'Chat room not found', null);
        }


        const alreadyJoined = await ChatRoomUser.findOne({
            userId: req.user._id,
            chatRoomId: chatRoom._id
        });
        if (alreadyJoined) {
            return customResponse(res, 400, 'You are already a member of this chat room', null);
        }

        const chatRoomUser = new ChatRoomUser({
            userId: req.user._id,
            chatRoomId: chatRoom._id,
        });
        await chatRoomUser.save();



        return customResponse(res, 200, 'Joined chat room successfully', chatRoom);
    } catch (err) {
        console.error(err);
        return customResponse(res, 500, 'Internal server error', null);
    }
};