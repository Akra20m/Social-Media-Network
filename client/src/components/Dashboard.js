import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PostsLists from './PostsLists';
import CreatePost from './CreatePost';
import Logout from './Logout';
import '../style.css';



class Dashboard extends React.Component {

    render(){
        if(!this.props.user.isLoggedIn) {
            return <Redirect to='/' />
        }
        return (
            <div className="test1">
            <Logout/>
            <h3 className="flex-component">Dashboard</h3>
            <CreatePost/>
            <PostsLists/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.user};
};

export default connect(mapStateToProps)(Dashboard);