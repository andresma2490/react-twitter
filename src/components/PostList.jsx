import React from 'react'
import Post from './Post';
import { db } from '../config/firebase.config';
import { toast } from 'react-toastify';


class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author:'',
            last:'',
            posts:[]
        }
    }

    componentDidMount(){
        this.getPosts();
    }

    getPosts = () =>{
        const docs = [];

        if(this.state.author){
            db.collection("posts")
            .where('author', '==', this.state.author)
            .orderBy('create_date')
            .startAfter(this.state.posts.length)
            .limit(5)
            .get()
            .then( querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    // console.log(doc.id, " => ", doc.data());
                    docs.push({ ...doc.data(), id:doc.id })
                })     
                this.setState({ posts: this.state.posts.concat(docs) })                          
            })
            .catch(

            );
        }
        else{
            db.collection('posts')
            .orderBy('create_date')
            .startAfter(this.state.posts.length)
            .limit(5)
            .get()
            .then( querySnapshot =>{
                
                let last = querySnapshot.docs[querySnapshot.docs.length - 1];
                this.setState({ last: last});

                querySnapshot.forEach(doc =>{
                    // console.log(doc.id, " => ", doc.data());
                    docs.push({ ...doc.data(), id:doc.id })
                    
                })     
                this.setState({ posts: this.state.posts.concat(docs) })                 
            })
            .catch(

            );
        }
    }

    nextPosts = () =>{
        let docs = [];
        db.collection('posts')
            .orderBy('create_date')
            .startAfter(this.state.last)
            .limit(5)
            .get()
            .then( querySnapshot =>{
                
                let last = querySnapshot.docs[querySnapshot.docs.length - 1];
                this.setState({ last: last});

                querySnapshot.forEach(doc =>{
                    // console.log(doc.id, " => ", doc.data());
                    docs.push({ ...doc.data(), id:doc.id })
                    
                })     
                this.setState({ posts: this.state.posts.concat(docs) })                       
            })
            .catch( error => {
                toast(error.message, {
                    type:'error'
                })
            });
    }

    render() { 
        return (
            <div>
                {
                    this.state.posts.map( doc =>
                        <Post key={doc.id} post={{ ...doc, id:doc.id }}/>
                    )
                }
                
                <div className="text-center mb-2">
                    <button className="btn btn-secondary center-block" onClick={this.nextPosts} style={{ display: this.state.last ? '' : 'none' }}> 
                        get more posts
                    </button>
                </div>
                
            </div>
        );
    }
}
 
export default PostList;