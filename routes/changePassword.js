const router = require('express').Router();
const Account = require('../models/account.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

router.route('/').post(async(req,res)=>{
    const {email, oldPassword, newPassword, confirmPassword} = req.body;

    const existingUser = await Account.findOne({'email':email});

    if(existingUser){
        const isPasswordCorrect = bcrypt.compareSync(oldPassword,existingUser.password);
        if(isPasswordCorrect){
            if(newPassword == confirmPassword){
                const hashedPassword = bcrypt.hashSync(newPassword)
                
                Account.findOneAndUpdate({'email':email})
                .then(user=>{
                    user.password = hashedPassword

                    user.save()
                    .then(()=>res.json({message:'successfully updated'}))
                    .catch(err=>res.json({'Error':err}))
                })
                .catch(err=>res.json({'Error':err}))  
            }
            else{
                res.status(404).json({message:'Confirm Password is Incorrect'})
            }
        }
        else{
            res.status(400).json({message:'Password is Incorrect'})
        }
    }
    else{
        res.status(400).json({message:'User not found'});
    }
})

module.exports = router;