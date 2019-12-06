import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createUser} from '../actions';

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

    render(){
        return (
            <div>
            <h3>Register</h3>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="name" label="Name" type="text" component={this.renderInput}/>
                <Field name="email" label="Email" type="email" component={this.renderInput}/>
                <Field name="username" label="Username" type="text" component={this.renderInput}/>
                <Field name="password" label="Password" type="password" component={this.renderInput}/>
                <button>Submit</button>
            </form>
            </div>
        );
    }
}

export default connect(null,{createUser})(reduxForm({
    form: 'register'
})(Register));