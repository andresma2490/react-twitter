import React from 'react';
import { toast } from 'react-toastify';
import { auth, db } from '../config/firebase.config';

class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          username: '',
          password: ''
        };
    }
    
    handleChange = (event)=> {
        const id = event.target.id;
        const value = event.target.value;

        this.setState({ [id]: value});
    }

    onSubmit = (event)=> {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then( user => {
                db.collection('users').doc().set({
                    photo: 'https://firebasestorage.googleapis.com/v0/b/reactwitter.appspot.com/o/User.png?alt=media&token=a433e67a-7bea-4369-aace-4361c97ba13b',
                    email: this.state.email,
                    username: this.state.username,
                    posts: []
                })
                .then( newUser => {
                    toast('user created', {
                        type: 'success'
                    });
                })
                .catch( error =>{
                    console.error(error)
                })
            })
            .catch( error =>{
                toast( error.message, {
                    type:'error'
                });
            }); 
    }

    render(){
        return(
            <div className="card" style={{ width:"20rem", padding:"20px", margin:"0 auto" }}>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label htmlFor="email">email</label>
                        <input type="email" className="form-control" id="email" value={ this.state.email } onChange={ this.handleChange }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">username</label>
                        <input type="text" className="form-control" id="username" value={ this.state.username } onChange={ this.handleChange }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" value={ this.state.password } onChange={ this.handleChange }/>
                    </div>
                    <button className="btn btn-primary ">
                        SignUp
                    </button>
                </form>
            </div>
        );
    }
}

export default SignUp;