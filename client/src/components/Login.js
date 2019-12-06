import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {loginUser} from '../actions';



class Login extends React.Component {

    renderInput({input,label,type}){
        return (
            <div>
                <label>{label}</label>
                <input {...input} type={type} required/>
            </div>
        );
    }

    onSubmit = (values) => {
        this.props.loginUser(values)
    }

    render(){
        if(this.props.isLoggedIn) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div>
            <h3>Login</h3>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="username" label="Username" type="text" component={this.renderInput}/>
                <Field name="password" label="Password" type="password" component={this.renderInput}/>
                <button>Login</button>
            </form>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {isLoggedIn: state.user.isLoggedIn}
};

export default connect(mapStateToProps,{loginUser})(reduxForm({
    form: 'login'
})(Login));