import React from 'react';
import { auth } from '../config/firebase.config';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    logout(){
        auth.signOut();
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ padding:"10px", marginBottom:"1rem" }}>
                <Link to="/" className="navbar-brand">
                    <img src="../logo192.png" alt="logo" style={{ width:"25px", margin:"5px" }}/>
                    RTwitter 
                </Link>

                {
                    this.props.authorized
                        ?<form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" style={{ height:"10px", width:"20rem" }}/>
                        </form>
                        :''
                }
                

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    {
                        this.props.authorized
                            ?<ul className="navbar-nav ml-auto" >
                                <li className="nav-item" >
                                    <Link to="/profile" className="nav-link"> Profile </Link>
                                </li>
                                <li className="nav-item" style={{ cursor:'pointer'}}>
                                    <span className="nav-link" onClick={ this.logout }> Logout </span>
                                </li>
                            </ul>
                            
                            :<ul className="navbar-nav ml-auto" >
                                <li className="nav-item">
                                <Link to="/login" className="nav-link"> Login </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signUp" className="nav-link"> SignUp </Link>
                                </li>
                            </ul>
                    }
                </div>
                
            </nav>
        );
    }
}

export default Navigation;