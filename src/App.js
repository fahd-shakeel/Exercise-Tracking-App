import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import $ from 'jquery';
import Popper from 'popper.js';

import { Route, Routes } from "react-router-dom";

import './App.css';
import ChangePassword from "./components/change-password.component"
// import SignupPage from "./components/signup.component";
import LoginPage from "./components/login.component"
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercises from "./components/edit-exercises.component";
import CreateExercises from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import noMatch from "./components/noMatch";
import ProtectedRoute from "./components/protected-route";
// import FirstPage from "./FirstPage"


function App() {

  return (

    <div className="container-fluid">
      
      <Routes>
        <Route path="/login" exact Component={LoginPage} />
        
        <Route path="*" element={
          <ProtectedRoute>
            <Navbar />
            <br />
            <Routes>
              <Route path="/" Component={ExercisesList} />
              <Route path="/edit/:id" Component={EditExercises} />
              <Route path="/create" Component={CreateExercises} />
              <Route path="/user" Component={CreateUser} />
            </Routes>
          </ProtectedRoute>
        } />

        <Route path="/changepassword" Component={ChangePassword} />
        <Route path="*" Component={noMatch} />
        </Routes>
    </div>

  );
}

export default App;
