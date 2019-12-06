import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';



class PostsLists extends React.Component {
    componentDidMount() {
        if(this.props.user.isLoggedIn) this.props.fetchPosts(this.props.user.access_token);
    }

    renderPosts() {
        return this.props.post.map(post => {
            return (
                <div key={post.id}>
                    <div>{post.post}</div>
                    <div>{post.username}</div>
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

export default connect(mapStateToProps,{fetchPosts})(PostsLists);