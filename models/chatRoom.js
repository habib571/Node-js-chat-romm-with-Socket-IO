const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // UUID for unique IDs

const chatRoomSchema = new mongoose.Schema(
    {
        id :{type : String , unique :true ,default: uuidv4}  ,
        name : {type : String  , required :true } ,
        token :{type : String ,required :true  } ,
        imageUrl : {type : String  } ,
        adminId : {type : String , required :true}
    }
)
const  ChatRoom =  mongoose.model('ChatRoom', chatRoomSchema);
module.exports = ChatRoom;