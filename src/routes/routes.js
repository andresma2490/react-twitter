import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { auth } from '../config/firebase.config';
import Navigation from '../components/Navigation';
import NoMatch from '../components/NoMatch';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import SignUp from '../components/SignUp';
import NewPost from '../components/NewPost';

const history = createBrowserHistory();

function PrivateRoute(props){
    return(
        props.authorized
        ?<Route {...props }/>
        :<Redirect to="/login"/> 
    ); 
}

function PublicRoute(props){
    return(
        !props.authorized
        ?<Route {...props }/>
        :<Redirect to="/"/> 
    ); 
}

class Routes extends React.Component{
    constructor(props) {
        super(props); 
        this.state = {
          authorized: false,
        };
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ authorized:true });
          } else {
            this.setState({ authorized:false }); 
          }
        });
    }

    render() {
        return(
            <Router history={history}>
                <Navigation authorized={this.state.authorized}/>
    
                <Switch>
                    <PublicRoute authorized={this.state.authorized} path="/login" component={ Login }/>
                    <PublicRoute authorized={this.state.authorized} path="/signUp" component={ SignUp }/>
    
                    <PrivateRoute authorized={this.state.authorized} path="/" exact component={ Home }/>
                    <PrivateRoute authorized={this.state.authorized} path="/profile" component={ Profile }/>
                    <PrivateRoute authorized={this.state.authorized} path="/edit/:id" component={ NewPost }/>

                    <Route path="*" component={ NoMatch }/>
                </Switch>
            </Router>
        );
    }
}

export default Routes;