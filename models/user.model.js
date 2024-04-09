const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        minLength:3
    },
});

const User = mongoose.model('User',userSchema);

module.exports=User;