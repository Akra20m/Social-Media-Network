import React from 'react';
import {connect} from 'react-redux';
import {Link,Redirect} from 'react-router-dom';
import {fetchSomePosts, deletePost,fetchUserPosts} from '../actions';
import Logout from './Logout';
import '../style.css';


class Profile extends React.Component {

    componentDidMount() {
        if(this.props.user.isLoggedIn) this.props.fetchUserPosts(this.props.user.access_token,this.props.user.username,7);
    }
    more = () => {
        this.props.fetchUserPosts(this.props.user.access_token,this.props.user.username,this.props.post.length+3);
    }

    onClick = (id) => {
        this.props.deletePost(this.props.user.access_token,id);
        }

    renderDeleteEdit = (post) => {
        if((post.username === this.props.user.username) || this.props.user.role) {
            return (
                <div className="post-buttons-containter">
                <Link to={`/posts/edit/${post.id}`}><button>Edit</button></Link>
                <button onClick={this.onClick.bind(this,post.id)}>Delete</button>
                </div>
            )};
    } 

    renderPosts() {
        return this.props.post.map(post => {
            if(post.username === this.props.user.username) {
                return (
                    <div className="post" key={post.id}>
                        <div className="post-text-container">{post.post}</div>
                        <div className="post-username-container">{post.username}</div>
                        {this.renderDeleteEdit(post)}
                    </div>
                );
            }
        });
    }
    checkMore() {
        if(this.props.post.length > 7) return <button onClick={this.more}>More</button>;
    }

    render() {
        if(!this.props.user.isLoggedIn) {
            return <Redirect to='/' />
        }
        return (
            <div className="test1">
            <Logout/>
            <div className="posts_container">
                {this.checkMore()}
                {this.renderPosts()}
                {console.log(this.renderPosts())}
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.user, post: Object.values(state.post)};
};

export default connect(mapStateToProps,{fetchUserPosts,fetchSomePosts,deletePost})(Profile);