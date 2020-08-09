import React from 'react';
import { getUser } from './User';
import PostList from './PostList';

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            author:'',
        };
        getUser()
            .then( user =>{
                this.setState({ author: user.username })
                console.log( this.state );
            })
    }

    render(){
        return(
            <div>
                <PostList author={ this.state.author }/>
            </div>
        );
    }
}

export default Profile;