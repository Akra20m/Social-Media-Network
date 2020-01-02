import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PostEdit from './PostEdit';
import {fetchPosts, fetchSomePosts, deletePost} from '../actions';
import '../style.css';


class PostsLists extends React.Component {
    state = {
        id: null,
        show: false
    };
    componentDidMount() {
        if(this.props.user.isLoggedIn) this.props.fetchSomePosts(this.props.user.access_token,8);
    }
    more = () => {
        this.props.fetchSomePosts(this.props.user.access_token,this.props.post.length+3);
    }

    deleteOnClick = (id) => {
        this.props.deletePost(this.props.user.access_token,id);
        }
    editOpen = (id) => {
        this.setState({id:id, show:true});
    }
    editClose = () => {
        this.setState({show:false});
    }

    renderDeleteEdit = (post) => {
        if((post.username === this.props.user.username) || this.props.user.role) {
            return (
                <div className="post-buttons-containter">
                {/*<Link to={`/posts/edit/${post.id}`}><button>Edit</button></Link>*/}
                <button onClick={this.editOpen.bind(this,post.id)}>Edit</button>
                <button onClick={this.deleteOnClick.bind(this,post.id)}>Delete</button>
                </div>
            )};
    } 

    renderPosts = () => {
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
        return <button onClick={this.more}>More</button>;
    }
    renderEdit() {
        if(this.state.show){
           return <PostEdit id={this.state.id} show={this.state.show} editClose={this.editClose} type={1}/>
        }
    }

    render() {
        console.log("Render works");
        if(this.props.post.length){
            return (
                <div className="posts_container">
                    {this.checkMore()}
                    {this.renderPosts()}
                    {this.renderEdit()}
                </div>
    
            );
        }
        return null;
    }
}

const mapStateToProps = state => {
    return {user: state.user, post: Object.values(state.post)};
};

export default connect(mapStateToProps,{fetchPosts,fetchSomePosts,deletePost})(PostsLists);