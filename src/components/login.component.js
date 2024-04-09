import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";


const LoginPage=() =>{
    const navigate = useNavigate();

    const [email, onChangeEmail] = useState('');
    const setEmail = (e) => onChangeEmail(e.target.value);

    const [password, onChangePassword] = useState('');
    const setPassword = (e) => onChangePassword(e.target.value);

    const onSubmit= async(e)=>{
        e.preventDefault();

        const loginDetail = {
            email:email,
            password:password
        }

        await axios.post(`https://exercise-tracking-app-1.onrender.com/login`,loginDetail)
        .then((res)=>{
            const token = res.data.jsonwebtoken;
            localStorage.setItem('user-token',token);
            navigate('/',{replace:true});
            setTimeout(()=>{
                localStorage.clear();
                alert("session time out");
                window.location.reload();
            },1000*120)
        })
        .catch((err)=>alert('Incorrect Email or Password'))  
    }

    return(
        <div className="container" id="outer-box">
            <div className="box">
                <form onSubmit={onSubmit}>
                    <h3><u>Login Account</u></h3>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="abc@example.com" onChange={setEmail}/>
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={setPassword}/>
                    </div>
                    <div className="row d-flex h-100">
                        <div className="col-6 justify-content-center align-self-center"><button type="submit" class="btn btn-dark" >Signin</button></div>
                        <div className="col-6 justify-content-center align-self-center"><a href="/changepassword">Change Password</a></div>
                    </div>
                </form>
            </div>
        </div>
    ) 
}

export default LoginPage;
