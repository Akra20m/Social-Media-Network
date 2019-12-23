import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPosts, fetchSomePosts, deletePost} from '../actions';
import '../style.css';


class PostsLists extends React.Component {
    componentDidMount() {
        if(this.props.user.isLoggedIn) this.props.fetchSomePosts(this.props.user.access_token,6);
    }
    more = () => {
        this.props.fetchSomePosts(this.props.user.access_token,this.props.post.length+3);
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
            return (
                <div className="post" key={post.id}>
                    <div className="post-text-container">{post.post}</div>
                    <div className="post-username-container">{post.username}</div>
                    {this.renderDeleteEdit(post)}
                </div>
            );
        });
    }
    checkMore() {
        if(this.props.post.length > 7) return <button onClick={this.more}>More</button>;
    }

    render() {

        return (
            <div className="posts_container">
                {this.checkMore()}
                {this.renderPosts()}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {user: state.user, post: Object.values(state.post)};
};

export default connect(mapStateToProps,{fetchPosts,fetchSomePosts,deletePost})(PostsLists);