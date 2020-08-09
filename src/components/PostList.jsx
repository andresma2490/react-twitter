import React from 'react'
import Post from './Post';
import { db } from '../config/firebase.config';


class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author:'',
            posts:[]
        }
    }

    componentDidMount(){
        this.getPosts();
    }

    getPosts(){
        const docs = [];

        if(this.props.author){
            db.collection("posts")
            .where('author', '==', this.props.author)
            .orderBy('create_date')
            .startAfter(this.state.posts.length)
            .limit(5)
            .get()
            .then( querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    // console.log(doc.id, " => ", doc.data());
                    docs.push({ ...doc.data(), id:doc.id })
                })     
                this.setState({ posts:docs })                          
            })
            .catch(

            );
        }
        else{
            db.collection("posts")
            .orderBy('create_date')
            .startAfter(this.state.posts.length)
            .limit(5)
            .get()
            .then( querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    // console.log(doc.id, " => ", doc.data());
                    docs.push({ ...doc.data(), id:doc.id })
                })     
                this.setState({ posts:docs })                          
            })
            .catch(

            );
        }
    }

    render() { 
        return (
            <div>
                {
                    this.state.posts.map( doc =>
                        <Post key={doc.id} post={ doc }/>
                    )
                }
            </div>
        );
    }
}
 
export default PostList;