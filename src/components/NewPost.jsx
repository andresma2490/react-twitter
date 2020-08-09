import React from 'react';
import { getUser } from './User';
import { db, storage, auth } from '../config/firebase.config';
import { toast } from 'react-toastify';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            author: '',
            email: auth.currentUser.email,
            description:'',
            image:'',
            create_date:'',
            update_date:'',
            likes: 0,
            comments:[]
        };

        if (this.props.id) {
            this.setState({id: this.props.id})
        }

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
                <div className="row">
                    <div className="col-2">
                        <img src="https://firebasestorage.googleapis.com/v0/b/reactwitter.appspot.com/o/User.png?alt=media&token=a433e67a-7bea-4369-aace-4361c97ba13b"
                            style={{ maxWidth:"4rem" }} className="mb-2" alt="post_image"/>
                    </div>

                    <div className="col-9">
                        <h5 className="card-title">{ this.state.author }</h5>
                        
                        <form onSubmit={ this.onSubmit }>
                            <div className="form-group">
                                <label htmlFor="description">What's happening?</label>
                                <textarea className="form-control" required name="description" rows="3" value={ this.state.description } onChange={ this.handleChange }/>
                            </div>

                            <img src={ this.state.image } style={{ display: this.state.image ? '' : 'none', maxWidth:"18rem" }} className="mb-2" alt="post_image"></img>

                            <button type="submit" className="btn btn-primary">
                                Twittear
                            </button>                  
                            
                            <label className="btn btn-secondary m-1" style={{ height:"45px", padding:"10px" }}>
                                <i className="material-icons"> add_photo_alternate </i>
                                <input type="file" onChange={ this.handleUpload } hidden/>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default NewPost;