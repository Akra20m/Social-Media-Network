import React from 'react';
import {connect} from 'react-redux';
import {Link,Redirect} from 'react-router-dom';
import {deletePost,fetchUserPosts} from '../actions';
import PostEdit from './PostEdit';
import Header from './Header';
import '../style.css';


class Profile extends React.Component {
    state = {
        id: null,
        show: false
    };

    componentDidMount() {
        if(this.props.user.isLoggedIn) this.props.fetchUserPosts(this.props.user.access_token,this.props.user.username,8);
    }
    more = () => {
        this.props.fetchUserPosts(this.props.user.access_token,this.props.user.username,this.props.post.length+3);
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
                <button onClick={this.editOpen.bind(this,post.id)}>Edit</button>
                <button onClick={this.deleteOnClick.bind(this,post.id)}>Delete</button>
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
    renderEdit() {
        if(this.state.show){
           return <PostEdit id={this.state.id} show={this.state.show} editClose={this.editClose} type={2}/>
        }
    }

    render() {
        if(!this.props.user.isLoggedIn) {
            return <Redirect to='/' />
        }
        return (
            <div className="cover_page" style={{backgroundColor:'#f0f2f5'}}>
            <div className="test1">
            <Header/>
            <div className="posts_container">
                {this.checkMore()}      
                {this.renderPosts()}
                {this.renderEdit()}
            </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.user, post: Object.values(state.userPost)};
};

export default connect(mapStateToProps,{fetchUserPosts,deletePost})(Profile);