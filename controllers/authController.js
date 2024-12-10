const User = require('../models/user');
const  customResponse = require("../utils/response")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req,res) => {
     try {
         const {name , email , password } = req.body ;
         const  hashedPassword = await  bcrypt.hash(password ,10)
          const user = new  User({name ,email , password : hashedPassword , imageUrl : "" ,status : "online"  })
         const existingUser = await User.findOne({ email: email });
         if (existingUser) {
             return customResponse(res,400 ,"user already exist" ,null )
         }
          await user.save() ;
         const token = jwt.sign({ id: user._id , email : email }, 'secret');
         return  customResponse(res,200 ,"user registered successfully" , {
               token ,
               user : user
         } )
      } catch (e) {
         customResponse(res,500 ,"failed to create new user" ,null )
     }
}
exports.login = async(req,res) => {
    try {
        const { email , password } = req.body ;
        const existingUser = await User.findOne({ email: email });
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if(!passwordMatch)  {
            return  customResponse(res,400 ,"credential does not match" , null)
        }
        if(!existingUser)  {
            return  customResponse(res,400 ,"credential does not match" , null)
        }
            const token = jwt.sign({ id :existingUser._id , email : email }, 'secret');
            return customResponse(
                res,
                200 ,
                "login successfully" , {token , user : existingUser} )


    } catch (e) {
        customResponse(res,500 ,"failed to create new user" ,null )

    }
}