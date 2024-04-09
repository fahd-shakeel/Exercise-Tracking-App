const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const cookie = require('cookie-parser');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(cookie());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri)

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDb connection established successfully");
})

//calling routes in server
const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')
const loginRouter=require('./routes/login')
const signupRouter = require('./routes/signup')
const verifyToken = require('./routes/verifyToken')
const getUser = require('./routes/getUser');
const changePasswordRouter = require('./routes/changePassword');

//using the created files with the selected path
app.use('/exercises', exercisesRouter);
app.use('/users',usersRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/changepassword',changePasswordRouter);
// app.use('/verify',verifyToken);


app.listen(port,()=>{
    console.log(`Server is listening on: ${port}`)
})