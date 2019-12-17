import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createPost} from '../actions';
import '../style.css';




class CreatePost extends React.Component {

    renderInput({input,type,placeholder}){
        return (
                <input className="input-post" {...input} type={type} placeholder={placeholder} maxLength="150" required/>
        );
    }

    onSubmit = (values) => {
        this.props.createPost(values,this.props.user.access_token)
    }

    render(){
        return (
            <div className="input-post-container">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="post"  type="text" placeholder="What are you thinking about?" component={this.renderInput}/>
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