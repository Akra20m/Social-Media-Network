import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createUser} from '../actions';
import '../style.css';


class Register extends React.Component {
    renderInput({input,label,type}){
        return (
            <div>
                <label>{label}</label>
                <input {...input} type={type} required/>
            </div>
        );
    }

    onSubmit = (values) => {
        this.props.createUser(values);
    }

    msg() {
        if(this.props.user.status===409) {
            return(
                <div><p>This email/username exists in our database</p></div>
         )}
        else if(this.props.user.status===201){
            return(
                <div><p>User Added. Login</p></div>
            )}
    }

    render(){
        return (
            <div className="test">
            <h2>Sign Up</h2>
            <form className="test" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="name" label="Name" type="text" component={this.renderInput}/>
                <Field name="email" label="Email" type="email" component={this.renderInput}/>
                <Field name="username" label="Username" type="text" component={this.renderInput}/>
                <Field name="password" label="Password" type="password" component={this.renderInput}/>
                <button className="main_button">Submit</button>
            </form>
            {this.msg()}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {user: state.user}
};

export default connect(mapStateToProps,{createUser})(reduxForm({
    form: 'register'
})(Register));