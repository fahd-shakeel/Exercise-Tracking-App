const jwt = require ('jsonwebtoken');
require('dotenv').config();
const KEY = process.env.MY_SECRET;
const router = require('express').Router();
const signup = require('../models/account.model')

router.route('/').get(async(req,res,next)=>{

    //we can use both the following (cookie method and header method for calling token)

    //calling token from cookie
    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1];
    console.log(token)

    // //calling token from header
    // const headers = req.headers[`authorization`]
    // const token = headers.split(" ")[1];
    // console.log(token);



    if(!token){
        res.status(404).json({message:"Token not found"})
    }

    jwt.verify(token,KEY,(err,user)=>{
        if(err){
            return res.status(400).json({message:err})
        }
        console.log(user.id);
        req.id=user.id;
    })

    

    //getting value of the verified user
    const userId = req.id;
    let user;
    try{
        user = await signup.findById(userId,"-password");   //this will get all the details of the user and here "-" sign will remove the password for the details 

    }
    catch(err){
        return new Error(err);
    }
    if(!user){
        return req.status(404).json({message:"user doesn't exists"})
    }
    return res.status(200).json({user})

    
})

module.exports = router;