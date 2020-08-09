import React from 'react';
import NewPost from './NewPost';
import PostList from './PostList';

class Home extends React.Component{   

    render(){
        return(
            <div>
                <NewPost/>
                <PostList/>
            </div>
        );
    }
}

export default Home;