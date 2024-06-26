import React, {Component} from 'react';
import axios from 'axios';

export default class CreateExercise extends Component{
    constructor(props){
        super(props)

        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            username:'',
        }
    }

    componentDidMount(){
        this.setState({
            users:['test user'],
            username:'test user'
        })
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        });
    }

    onSubmit=async=>(e){
        e.preventDefault();

        const user = {
            username:this.state.username,
            }

        console.log(user);

        this.setState({
            username:''
        })

        await axios.post('https://exercise-tracking-app-1.onrender.com/users/add',user)
        .then(res => console.log(res.data))
        .catch(err => console.log('Error: '+err))

        window.location = '/create';
    }
    render(){
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
