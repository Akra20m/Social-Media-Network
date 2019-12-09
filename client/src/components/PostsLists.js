import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPosts, deletePost} from '../actions';



class PostsLists extends React.Component {
    componentDidMount() {
        if(this.props.user.isLoggedIn) this.props.fetchPosts(this.props.user.access_token);
    }
    
    onClick = (id) => {
        this.props.deletePost(this.props.user.access_token,id);
        }

    renderDeleteEdit = (post) => {
        if(post.username === this.props.user.username) {
            return (
                <div>
                <Link to={`/posts/edit/${post.id}`}>Edit</Link>
                <button onClick={this.onClick.bind(this,post.id)}>Delete</button>
                </div>
            )};
    } 

    renderPosts() {
        return this.props.post.map(post => {
            return (
                <div key={post.id}>
                    <div>{post.post}</div>
                    <div>{post.username}</div>
                    {this.renderDeleteEdit(post)}
                </div>
            );
        });
    }

    render(){

        return (
            <div>
            <div>{this.renderPosts()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.user, post: Object.values(state.post)};
};

export default connect(mapStateToProps,{fetchPosts,deletePost})(PostsLists);