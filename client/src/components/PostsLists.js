import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactEmoji from "react-emoji";
import PostEdit from "./PostEdit";
import Comment from "./Comment";
import { avatarInfo } from "../helper";
import { fetchPosts, fetchSomePosts, deletePost } from "../actions";
import "../style.css";

class PostsLists extends React.Component {
  state = {
    id: null,
    show: false
  };
  componentDidMount() {
    if (this.props.user.isLoggedIn)
      this.props.fetchSomePosts(this.props.user.access_token, 8);
  }
  more = () => {
    this.props.fetchSomePosts(
      this.props.user.access_token,
      this.props.post.length + 3
    );
  };

  deleteOnClick = id => {
    this.props.deletePost(this.props.user.access_token, id);
  };
  editOpen = id => {
    this.setState({ id: id, show: true });
  };
  editClose = () => {
    this.setState({ show: false });
  };
  displayComment = id => {
    return <Comment id={id} />;
  };
  renderDeleteEdit = post => {
    if (post.username === this.props.user.username || this.props.user.role) {
      return (
        <div className="post-buttons-containter">
          <i
            className="edit icon large button-edit"
            onClick={this.editOpen.bind(this, post.id)}
            Aria-label="click to edit post"
          ></i>
          <i
            className="trash icon large button-delete"
            onClick={this.deleteOnClick.bind(this, post.id)}
            Aria-label="click to delete post"
          ></i>

          {/* <button className="button-edit" onClick={this.editOpen.bind(this,post.id)}>Edit</button> */}
          {/* <button className="button-delete" onClick={this.deleteOnClick.bind(this,post.id)}>Delete</button> */}
        </div>
      );
    }
  };

  renderPosts = () => {
    return this.props.post.map(post => {
      return (
        <div className="post" key={post.id}>
          <div className="post-text-container">
            {ReactEmoji.emojify(post.post)}
          </div>
          <img
            src={
              this.props.avatar[post.username]
                ? avatarInfo[this.props.avatar[post.username].avatar]
                : "https://semantic-ui.com/images/avatar2/large/elyse.png"
            }
            alt="image"
            className="ui avatar image"
          />
          <div className="post-username-container">{post.username}</div>
          <div className="post-date-container">{post.date.substr(0, 10)}</div>
          {this.renderDeleteEdit(post)}
          {this.displayComment(post.id)}
        </div>
      );
    });
  };
  checkMore() {
    if (!this.props.user.noMoreAll)
      return <button onClick={this.more}>More</button>;
  }
  renderEdit() {
    if (this.state.show) {
      return (
        <PostEdit
          id={this.state.id}
          show={this.state.show}
          editClose={this.editClose}
          type={1}
        />
      );
    }
  }

  render() {
    if (this.props.post.length) {
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
  return {
    user: state.user,
    post: Object.values(state.post),
    avatar: state.avatar
  };
};

export default connect(mapStateToProps, {
  fetchPosts,
  fetchSomePosts,
  deletePost
})(PostsLists);
