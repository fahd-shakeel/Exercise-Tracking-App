import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute=(props)=>{
    const navigate = useNavigate();

    const [isLoggedIn, setLoggedIn] = useState(false);

    const checkUserToken =() =>{
        const userToken = localStorage.getItem('user-token');

        if(!userToken || userToken === 'undefined'){
            setLoggedIn(false);
            return navigate('/login');
        }

        setLoggedIn(true);
    }

    useEffect(()=>{
        checkUserToken();
    },[isLoggedIn])

    return(
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    )
}


export default ProtectedRoute;