import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./Logout";
import { avatarInfo } from "../helper";

const Header = props => {
  return (
    <div className="header-custom">
      <img
        src={
          props.avatar[props.user.username]
            ? avatarInfo[props.avatar[props.user.username].avatar]
            : "https://semantic-ui.com/images/avatar2/large/elyse.png"
        }
        alt="image"
        className="ui avatar image"
      />
      <Link className="nav-item" to="/profile">
        {props.user.username}
      </Link>
      <Link className="nav-item" to="/dashboard">
        home
      </Link>
      <Logout />
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.user, avatar: state.avatar };
};

export default connect(mapStateToProps)(Header);
