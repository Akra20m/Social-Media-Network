import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {logoutUser} from '../actions';



class Logout extends React.Component {


    onSubmit = () => {
        this.props.logoutUser(this.props.user.access_token)
    }

    render(){
        return (
            <div>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <button>Logout</button>
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