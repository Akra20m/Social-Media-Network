import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {loginUser} from '../actions';
import '../style.css';



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

    errormsg() {
        if(this.props.user.status===422) {
            return(
                <div><p>Username/Password is incorrect</p></div>
         );
    }}

    render(){
        if(this.props.user.isLoggedIn) {
            return <Redirect to='/dashboard' />
        }
       
        return (
            <div className="test">
            <h2>Login</h2>
            <form className="test" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="username" label="Username" type="text" component={this.renderInput}/>
                <Field name="password" label="Password" type="password" component={this.renderInput}/>
                <button className="main_button">Login</button>
            </form>
            {this.errormsg()}
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {user: state.user}
};

export default connect(mapStateToProps,{loginUser})(reduxForm({
    form: 'login'
})(Login));