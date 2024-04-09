import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">Excer Tracker</Link>

                    <button className="navbar-toggler" type="button" data-toggle="dropdown" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle Navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div id="navbarCollapse" className="collapse navbar-collapse" >
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item ">
                                <Link to="/" className="nav-link active text-center">Exercises</Link> 
                            </li>
                            <li className="nav-item">
                                <Link to="/create" className="nav-link text-center">Create Exercise Log</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user" className="nav-link text-center">Create User</Link>
                            </li>
                            <li className="nav-item text-center">
                                <Link to="/login"><button className='btn btn-dark' onClick={()=>localStorage.clear()}>LogOut</button></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}