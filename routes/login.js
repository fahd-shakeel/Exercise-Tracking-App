require('dotenv').config();
const jwt = require("jsonwebtoken");
const router = require('express').Router();
const bcrypt = require('bcryptjs');
let Login = require('../models/login.model')
let Signup = require('../models/account.model')
const KEY = process.env.MY_SECRET;

router.route('/').get((req,res)=>{
    // Login.find()
    // .then(login=>res.json(login))
    // .catch(err=>res.status(404).json("Error"+err))

    const verifyToken=((req,res,next)=>{
        const headers = req.headers[`authorization`]
        
        const token = headers.split(" ")[1];
    
        if(!token){
            res.status(404).json({message:"Token not found"})
        }
        
        jwt.verify(String(token),KEY,(err,user)=>{
            if(err){
                res.status(400).json({message:"Invalid Token"})
            }
            res.json({"userUd":user.id});
        })
    })
    
})

router.route('/').post(async (req,res)=>{
    const {email,password} = req.body;

    const existingUser = await Signup.findOne({'email':email});

    if(existingUser){   //we get the user with the input email
        if(existingUser.email == req.body.email){   //verifying the email with the Database email and Input email 

            const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)    //Comparing the Inputted password and specific email password from Database
            if(isPasswordCorrect){  //when comparision is ture
                const token = jwt.sign({id:existingUser._id},KEY,{expiresIn:"60s"})      //generating the json web token
                
                res.cookie(String(existingUser._id),token,{
                    path: '/',
                    expire: new Date(Date.now()+1000*60),
                    httpOnly : true,
                    sameSite: 'lax',
                    secure:true
                })
                res.status(200).json({message:"You have Successfully Logged In",user:existingUser,jsonwebtoken:token})
            }
            else{
                res.status(400).json({message:"Either Email or Password is Incorrect!"});
            }
        }
        else{
            res.status(400).json({message:"Either Email or Password is Incorrect!"});
        }
    }
    else{
        res.status(400).json({message:"Either Email or Password is Incorrect!"});
    }
})

module.exports = router;