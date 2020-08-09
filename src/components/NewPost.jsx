import React from 'react';
import { getUser } from './User';
import { db, storage, auth } from '../config/firebase.config';
import { toast } from 'react-toastify';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            email: auth.currentUser.email,
            description:'',
            image:'',
            create_date:'',
            update_date:'',
            likes: 0,
            comments:[]
        };

        this.handleUpload = this.handleUpload.bind(this); // input file
        this.handleSubmit = this.handleSubmit.bind(this); // button
    }

    componentDidMount(){
        getUser()
            .then( user =>{
                this.setState({ author: user.username })
            })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    addPost = () => {
        this.setState({ create_date: new Date() });

        db.collection('posts').doc().set(this.state)
            .then(post =>{
                toast('post added',{
                    type:'success'
                });
            })
            .catch(error =>{
                toast(error.message,{
                    type:'error'
                });
            });
    }


    editPost = (postObject) => {
        
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.handleUpload()
    };
    
    handleUpload = (event) => {
        const file = event.target.files[0];
        const storageRef = storage.ref(`/posts/${ file.name }`);
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
            storage.ref('posts').child(file.name).getDownloadURL()
                .then(firebaseURL =>{
                    this.setState({ image: firebaseURL })
                })
        }
        )
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.state.id){
            this.editPost();
        }
        else {
            this.addPost(this.state);
            this.setState({
                    description:'',
                    image:'',
                    create_date:'',
                    update_date:'',
                    likes: 0,
                    comments:[]
            });
        }
    }
    

    render() { 
        return (
            <div className="card mb-2" style={{ width:"30rem", padding:"20px", margin:"0 auto" }}>
                
                <form onSubmit={ this.onSubmit }>
                    
                    <img src={ this.state.image } style={{ display: this.state.image ? '' : 'none', maxWidth:"18rem" }} className="mb-2" alt="post_image"></img>

                    <div className="form-group">
                        <label htmlFor="description">What's happening?</label>
                        <textarea className="form-control" required name="description" rows="3" value={ this.state.description } onChange={ this.handleChange }/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Twittear
                    </button>                  
                    
                    <label className="btn btn-secondary m-1" style={{ height:"45px", padding:"10px" }}>
                        <i className="material-icons"> add_photo_alternate </i>
                        <input type="file" onChange={ this.handleUpload } hidden/>
                    </label>

                </form>
            </div>
        );
    }
}
 
export default NewPost;