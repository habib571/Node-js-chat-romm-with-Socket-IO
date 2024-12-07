const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password : {type : String , required : true} ,
    imageUrl :{type : String , require : false} ,
     status : {type : String , require : true} ,
     createdAt: { type: Date, default: Date.now }
});
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
