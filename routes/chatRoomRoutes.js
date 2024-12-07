const express = require('express');
const authUser = require("../utils/middelware")
const router = express.Router();
const {createRoom ,getMyChatRooms ,joinRoom}  = require("../controllers/chatRoomController") ;
const {getChatRoomMessages} = require("../controllers/messageController") ;

router.post("/create-room" , authUser ,createRoom)
router.get("/get-my-rooms" ,authUser ,getMyChatRooms)
router.post("/join" , authUser ,joinRoom)
router.get("/:chatRoomId/messages" ,authUser ,getChatRoomMessages)
module.exports =router ;