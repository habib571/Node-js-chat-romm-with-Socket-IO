const User = require('../models/user');
const  customResponse = require("../utils/response")
exports.getCurrentUser = async (req , res ) => {
    try {
        const user = req.user;
        if (!user) {
            return customResponse(res, 401, "unauthorized");
        }
         console.log(user)
        const currentUser =  await User.findOne({"email" :user.id})
        return customResponse(res, 200, "User fetched successfully", currentUser);
    } catch (err) {
        console.error(err);
        return customResponse(res, 500, "Internal server error");
    }

}
exports.getUserById = async (req ,res) => {
    try {

        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return customResponse(res, 404, "User not found");
        }

        // Respond with user details
        return customResponse(res, 200, "User fetched successfully",user);
    } catch (err) {
        console.error(err);
        return customResponse(res, 500, "Internal server error");
    }

}