import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Logout from './Logout';


const Header = (props) => {
    return (
        <div className="header">
        {/* <img src={"https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg"} alt="image" className="ui avatar image"/> */}
        <Link className="nav-item" to="/profile">{props.user.username}</Link>
        <Link className="nav-item" to="/dashboard">home</Link>
        <Logout/>
        </div>
    );
}

const mapStateToProps = state => {
    return {user: state.user};
};

export default connect(mapStateToProps)(Header);