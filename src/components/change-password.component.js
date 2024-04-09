import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Params } from "react-router-dom";
import axios from 'axios';
import "./change-password.css"

function ChangePassword() {
    const navigate = useNavigate();

    const [email,onChangeEmail] = useState('');
    const setEmail =(e)=> onChangeEmail(e.target.value);

    const [oldPassword,onChangeOldPassword] = useState('');
    const setOldPassword =(e)=> onChangeOldPassword(e.target.value);

    const [newPassword,onChangeNewPassword] = useState('');
    const setNewPassword =(e)=> onChangeNewPassword(e.target.value);

    const [confirmPassword, onChangeConfirmPassword] = useState('');
    const setConfirmPassword =(e) => onChangeConfirmPassword(e.target.value);

    const onSubmit=(e)=>{
        e.preventDefault();

        const details={
            email:email,
            oldPassword:oldPassword,
            newPassword:newPassword,
            confirmPassword:confirmPassword,
        }

        axios.post(`http://localhost:3000/changepassword`,details)
        .then(res=>{navigate('/login',{replace:true})})
        .catch(err=>alert('SignUp is not done yet'))

    }

    return(
        <div className="container" id="change-password-outer-box">
            <div className="box">
                <form onSubmit={onSubmit}>
                    <h3><u>Change Password</u></h3>
                    <h4>Enter Details</h4>
                    <div class="form-group">
                      <label for="InputEmail1">Email address</label>
                      <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="abc@example.com" onChange={setEmail}/>
                    </div>
                    <div class="form-group">
                      <label for="InputPassword1">Old Password</label>
                      <input type="password" class="form-control" id="InputPassword1" placeholder="Password" onChange={setOldPassword}/>
                    </div>
                    <div class="form-group">
                      <label for="InputPassword2">New Password</label>
                      <input type="password" class="form-control" id="InputPassword2" placeholder="Password" onChange={setNewPassword}/>
                    </div>
                    <div class="form-group">
                      <label for="InputPassword3">Confirm Password</label>
                      <input type="password" class="form-control" id="InputPassword3" placeholder="Password" onChange={setConfirmPassword} />
                    </div>
                    {/* <button type="submit" class="btn btn-primary" onClick={navigateToHome}>Signup</button> */}
                    <button type="submit" class="btn btn-dark" onClick={()=>alert("You have successfully changed the password")}>Change Password</button>
                </form>
            </div>
        </div>
    ) 
}

export default ChangePassword;