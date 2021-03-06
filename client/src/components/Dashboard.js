import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { fetchAvatars } from "../actions";
import PostsLists from "./PostsLists";
import CreatePost from "./CreatePost";
import Header from "./Header";
import "../style.css";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchAvatars(this.props.user.access_token);
  }
  render() {
    if (!this.props.user.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="cover_page" style={{ backgroundColor: "#f0f2f5" }}>
        <div className="test1">
          <Header />
          <CreatePost />
          <PostsLists />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, { fetchAvatars })(Dashboard);
