import React from 'react';
import { getUser } from './User';
import { db, storage } from '../config/firebase.config';
import { toast } from 'react-toastify';

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            email:'',
            username:'',
            photo:'',
            posts:[]
        }
    }

    componentDidMount(){
        getUser()
            .then( user =>{
                this.setState(user);
            })
    }

    handleChange = (event)=> {
        const id = event.target.id;
        const value = event.target.value;

        this.setState({ [id]: value});
    }


    handleUpload = (event) => {
        const file = event.target.files[0];
        const storageRef = storage.ref(`/users/${ file.name }`);
        const task = storageRef.put(file);

        task.on('state_changed', 
        (snapshot) =>{   
            // takes a snap shot of the process as it is happening
        }, 
        (error)=>{
            toast('error',{
                type:'error'
            })
        },
        () =>{
            storage.ref('users').child(file.name).getDownloadURL()
                .then(firebaseURL =>{
                    this.setState({ photo: firebaseURL })
                })
        }
        )
    }

    editUser = () =>{
        console.log(this.state);

        db.collection('users').doc(this.state.id).set(this.state)
            .then( user =>{
                toast('User edited', {
                    type: 'info',
                })
            })
            .catch( error =>{
                toast(error.message, {
                    type:'error'
                })
            })
    }

    render(){
        return(
            <div className="card mb-2 text-center" style={{ width:"30rem", padding:"20px", margin:"0 auto" }}>
                    <h3 className="card-title mt-2">{ this.state.email }</h3>

                    <img src={[this.state.photo]} alt="user_photo" style={{ maxWidth:"18rem", margin:"0 auto"}} className="mb-5"/>
                    
                    <br/>
                    <label className="btn btn-secondary m-1" style={{ height:"45px", padding:"10px"}}>
                        <i className="material-icons"> add_photo_alternate </i>
                        <input type="file" onChange={ this.handleUpload } hidden/>
                    </label>

                    <div className="form-group">
                        <h5 className="card-subtitle mt-2 text-muted"> username: </h5>
                        <input required type="text" className="form-control" id="username" value={ this.state.username } onChange={ this.handleChange } style={{ maxWidth:"15rem", margin:"0 auto"}}/>
                    </div>

                    <button onClick={this.editUser} className="btn btn-primary mt-3" >
                        Save
                    </button>
            </div>
        );
    }
}

export default Profile;