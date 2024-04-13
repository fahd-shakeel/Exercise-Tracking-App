import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={'/edit/'+props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends Component{
    constructor(props){
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);

        this.state={exercises:[]}
    }

    componentDidMount(){
        axios.get('https://exercise-tracking-app-1.onrender.com/exercises/')
            .then(response => {
                this.setState({
                    exercises: response.data
                })
            })
            .catch(err => console.log(err))
    }

    deleteExercise(id){
        axios.delete('https://exercise-tracking-app-1.onrender.com/exercises/'+id)
            .then(res => console.log(res.data))
        // this.setState({
        //     exercises : this.setState.exercises.filter(el => el._id!==id)
        // })
        window.location= '/';
    }

    exerciseList(){
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
        })
    }

    render(){
        return(
            <div">
                <h3>Logged Exercises</h3>
                <table className="table table-responsive-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table> 
            </div>
        )
    }
}
