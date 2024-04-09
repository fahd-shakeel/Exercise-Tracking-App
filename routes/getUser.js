const router = require('express').Router();
const signup = require('../models/account.model');

router.route('/').get( async(req,res,next)=>{
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