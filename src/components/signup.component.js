import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Params } from "react-router-dom";
import axios from 'axios';

function SignupPage() {
    const [name,onChangeName] = useState('');
    const setName = (e) =>onChangeName(e.target.value);

    const [email,onChangeEmail] = useState('');
    const setEmail =(e)=> onChangeEmail(e.target.value);

    const [password,onChangePassword] = useState('');
    const setPassword =(e)=> onChangePassword(e.target.value);
    
    const verify =(e)=>{
        if(alert(console.log(e))){
            <Link to={'/login'} />
        }
    }

    const onSubmit=(e)=>{
        e.preventDefault();

        const details={
            name:name,
            email:email,
            password:password
        }

        axios.post(`http://localhost:3000/signup`,details)
        .then(res=>console.log(res.data))
        .catch(err=>alert('Error'+err))

        // window.location('./login');
    }

    return(
        <div className="container">
            <div className="box">
                <form onSubmit={onSubmit}>
                    <h3><u>Signup</u></h3>
                    <h4>Enter Details</h4>
                    <div class="form-group">
                      <label for="exampleInputName1">Name</label>
                      <input type="name" class="form-control" id="exampleInputName1" placeholder="name" onChange={setName}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="abc@example.com" onChange={setEmail}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={setPassword}/>
                    </div>
                    {/* <button type="submit" class="btn btn-primary" onClick={navigateToHome}>Signup</button> */}
                    <Link to="/" className="btn btn-dark" onClick={verify}>Sign up</Link>
                </form>
            </div>
        </div>
    ) 
}

export default SignupPage;