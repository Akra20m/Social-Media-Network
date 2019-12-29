import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Logout from './Logout';


const Header = (props) => {
    return (
        <div className="header">
        <Link className="profile" to="/dashboard">home</Link>
        <Link className="profile" to="/profile">{props.user.username}</Link>
        <Logout/>
        </div>
    );
}

const mapStateToProps = state => {
    return {user: state.user};
};

export default connect(mapStateToProps)(Header);