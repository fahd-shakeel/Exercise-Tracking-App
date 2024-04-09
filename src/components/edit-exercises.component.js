import React, {Component, useState} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



const EditExercises = (props) =>{
    
    const params=useParams();

    const [username,onChangeUsername]=useState('');
    const setUsername=(e)=>onChangeUsername(e.target.value)
    
    const [users,onChangeUsers]=useState([]);
    const setUsers=(e)=>onChangeUsers([e.target.value])

    const [description,onChangeDescription]=useState('');
    const setDescription=(e)=>onChangeDescription(e.target.value)

    const [duration,onChangeDuration]=useState('');
    const setDuration=(e)=>onChangeDuration(e.target.value)

    const [date,onChangeDate]=useState(new Date());
    const setDate=(date)=>onChangeDate(date)

    const onSubmit=(e)=>{
        e.preventDefault();

        const exercise = {
            username:username,
            description:description,
            duration:duration,
            date:date
        }
        console.log(exercise);

        axios.post(`http://localhost:3000/exercises/update/${params.id}`,exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error: "+err))

        window.location = '/';
    }
    
    useEffect(()=>{
        axios.get(`http://localhost:3000/exercises/${params.id}`)
            .then((response) => {
                onChangeUsername(response.data.username)
                
            })
            .catch(err => console.log("Error: "+err))

        axios.get('http://localhost:3000/users/')
            .then(res => {
                if(res.data.length > 0){
                    onChangeUsers(res.data.map(user=>user.username))
                }
            })
            .catch(err => console.log("Error: "+err))
    },[])

    return(

        <div>
                 <h3>Edit Exercise Log</h3>
                 <form onSubmit={onSubmit}>
                     <div className="form-group">
                         <label>Description: </label>
                         <input type="text" 
                             required 
                             className="form-control" 
                             value={description} 
                             onChange={setDescription} 
                             />
                     </div>
                     <div className="from-group">
                         <label>Duration (in minutes): </label>
                         <input type="text"
                         className="form-control"
                         value={duration}
                         onChange={setDuration}
                         />
                     </div>
                     <div className="form-group">
                         <label>Date: </label>
                         <div>
                             <DatePicker selected={date} onChange={onChangeDate} />
                         </div>
                     </div>
                     <div className="from-group">
                         <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                     </div>
                 </form>
             </div>
    )
}

export default EditExercises;







//--------------------class component of the above (but params.id is not working as class component does not allow in the latest one)
// export default class EditExercises extends Component{
//     constructor(props){
//         super(props)

//         this.onChangeUsername=this.onChangeUsername.bind(this);
//         this.onChangeDuration=this.onChangeDuration.bind(this);
//         this.onChangeDescription=this.onChangeDescription.bind(this);
//         this.onChangeDate=this.onChangeDate.bind(this);
//         this.onSubmit=this.onSubmit.bind(this);

//         this.state={
//             username:'',
//             description:'',
//             duration:0,
//             date:new Date(),
//             users:[]
//         }
//     }
    
//     componentDidMount(){
//         axios.get('http://localhost:3000/exercises/'+this.props.match.params.id)    //match.params.id
//             .then(response => {
//                 this.setState({
//                     username: response.data.username,
//                     description: response.data.description,
//                     duration: response.data.duration,
//                     date: new Date(response.data.date)
//                 })
//             })
//             .catch(err => console.log("Error: "+err))

//         axios.get('http://localhost:3000/users/')
//             .then(res => {
//                 if(res.data.length > 0){
//                     this.setState({
//                         users: res.data.map(user => user.username)
//                     })
//                 }
//             })
//             .catch(err => console.log("Error: "+err))
//     }

//     onChangeUsername(e){
//         this.setState({
//             username:e.target.value
//         });
//     }   

//     onChangeDescription(e){
//         this.setState({
//             description:e.target.value
//         });
//     }

//     onChangeDuration(e){
//         this.setState({
//             duration:e.target.value
//         });
//     }

//     onChangeDate(date){
//         this.setState({
//             date:date
//         });
//     }

//     onSubmit(e){
//         e.preventDefault();

//         const exercise = {
//             username:this.state.username,
//             description:this.state.description,
//             duration:this.state.duration,
//             date:this.state.date
//         }
//         console.log(this.props);

//         axios.post('http://localhost:3000/exercises/update/'+this.props.match.params.id,exercise)   //match.params.id
//             .then(res => console.log(res.data))
//             .catch(err => console.log("Error: "+err))

//         window.location = '/';
//     }
//     render(){
//         return(
//             <div>
//                 <h3>Edit Exercise Log</h3>
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <label>Username: </label>
//                         <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
//                             {this.state.users.map(function(user){
//                                 return <option key={user} value={user}>{user}</option>
//                             })}
//                         </select>
//                     </div>

//                     <div className="form-group">
//                         <label>Description: </label>
//                         <input type="text" 
//                             required 
//                             className="form-control" 
//                             value={this.state.description} 
//                             onChange={this.onChangeDescription} 
//                             />
//                     </div>

//                     <div className="from-group">
//                         <label>Duration (in minutes): </label>
//                         <input type="text"
//                         className="form-control"
//                         value={this.state.duration}
//                         onChange={this.onChangeDuration}
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Date: </label>
//                         <div>
//                             <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
//                         </div>
//                     </div>

//                     <div className="from-group">
//                         <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }