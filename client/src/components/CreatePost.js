import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createPost} from '../actions';



class CreatePost extends React.Component {

    renderInput({input,label,type}){
        return (
            <div>
                <label>{label}</label>
                <input {...input} type={type} maxLength="150" required/>
            </div>
        );
    }

    onSubmit = (values) => {
        this.props.createPost(values,this.props.user.access_token)
    }

    render(){
        return (
            <div>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="post" label="Post" type="text" component={this.renderInput}/>
                <button>Post</button>
            </form>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {user: state.user};
};

export default connect(mapStateToProps,{createPost})(reduxForm({
    form: 'post'
})(CreatePost));