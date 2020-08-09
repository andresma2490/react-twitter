import React from 'react';
import { db, auth } from '../config/firebase.config';

class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state = { ...this.props.post };        
    }

    likeButton = false;

    like = async () =>{
        this.likeButton = !this.likeButton;
        
        if (this.likeButton){
            await this.setState({ likes: this.state.likes +1 })
            await db.collection('posts').doc(this.state.id).update({ likes: this.state.likes });
        }
        else {
            await this.setState({ likes: this.state.likes -1 });
            await db.collection('posts').doc(this.state.id).set(this.state);
        }
    }

    canEdit = () => {
        return this.state.email === auth.currentUser.email;
    }

    render(){
        return(
            <div className="card mb-2" style={{ width:"30rem", padding:"20px", margin:"0 auto" }}>
                <div className="row">
                    <div className="col-2">
                    <img src="https://firebasestorage.googleapis.com/v0/b/reactwitter.appspot.com/o/User.png?alt=media&token=a433e67a-7bea-4369-aace-4361c97ba13b"
                        style={{ maxWidth:"4rem" }} className="mb-2" alt="post_image"/>
                    </div>

                    <div className="col-10">
                        <h5 className="card-title">{ this.state.author }</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{ this.state.description }</h6>
                        <img src={ this.state.image } style={{ display: this.state.image ? '' : 'none', maxWidth:"22rem" }} className="mb-2" alt="post_image"></img>
                        <hr/>
                        <div className="ml-auto">
                            <button className="btn btn-secondary ml-1" style={{ display: this.canEdit() ? '' : 'none' ,padding:"4px", width:"2rem"}}>
                                <i className="material-icons">
                                    create
                                </i>
                            </button>  
                            <button className="btn btn-secondary ml-1" onClick={ this.like } style={{ padding:"4px", width:"3rem"}}>
                                <i className="material-icons">
                                    { this.likeButton ? 'favorite' : 'favorite_border'}
                                </i>
                                { this.state.likes }
                            </button>  
                        </div>  
                    </div>
                </div>                               
            </div>
        );
    }
}

export default Post;