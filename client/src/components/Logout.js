import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {logoutUser} from '../actions';
import '../style.css';



class Logout extends React.Component {


    onSubmit = () => {
        this.props.logoutUser(this.props.user.access_token)
        window.localStorage.clear();
    }

    render(){
        return (
            <div>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <button className="logout">Logout</button>
            </form>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {user: state.user};
};

export default connect(mapStateToProps,{logoutUser})(reduxForm({
    form: 'logout'
})(Logout));