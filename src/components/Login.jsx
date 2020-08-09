import React from 'react';
import { auth } from '../config/firebase.config';
import { toast } from 'react-toastify';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        };
    }

    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit = (event)=> {
        event.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then( user => {
                // to do
            })
            .catch( error => {
                toast(error.message, {
                    type:'error'
                });
            })
    }
    
    render() {
        return (
            <div className="card" style={{ width:"20rem", padding:"20px", margin:"0 auto" }}>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label htmlFor="email">email</label>
                        <input type="email" className="form-control" name="email" value={ this.state.email } onChange={ this.handleChange }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">password</label>
                        <input type="password" className="form-control" name="password" value={ this.state.password } onChange={ this.handleChange }/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        SignIn
                    </button>
                </form>
            </div>
        )
    }
}

export default Login;