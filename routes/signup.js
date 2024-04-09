const Account = require('../models/account.model');
const bcrypt = require('bcryptjs');

const router = require('express').Router();

router.route('/').post(async (req,res)=>{
    const {name,email,password} = req.body;

    let existingUser;

    existingUser = await Account.findOne({'email':req.body.email});

    if(existingUser){
        res.status(400).json({message:"Email already Registered! Login Instead"});
    }
    else{
        const hashedPassword = bcrypt.hashSync(password);

        const newAccount = new Account({name,email,password:hashedPassword});

        newAccount.save()
        .then(()=>res.json('SignUp Successfully'))
        .catch(err=>res.status(404).json(err))
    }
})

module.exports = router;