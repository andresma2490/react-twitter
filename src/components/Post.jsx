import React from 'react';
import { auth } from '../config/firebase.config';

class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state = { ...this.props.post, likeButton:false };
    }

    like = () =>{
        this.setState({ likeButton: !this.state.likeButton });
    }

    canEdit = () => {
        return this.state.email === auth.currentUser.email;
    }

    render(){
        return(
            <div className="card mb-2" style={{ width:"30rem", padding:"20px", margin:"0 auto" }}>
                <div className="row">
                    <div className="col-2">
                    <img src="https://firebasestorage.googleapis.com/v0/b/reactapp-9470e.appspot.com/o/userIcon.png?alt=media&token=178de382-dfbe-4945-9884-067e27507bf1"
                        style={{ maxWidth:"4rem" }} className="mb-2" alt="post_image"></img>
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
                                    { this.state.likeButton ? 'favorite' : 'favorite_border'}
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