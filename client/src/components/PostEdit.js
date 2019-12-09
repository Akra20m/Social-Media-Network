import React from 'react';
import {connect} from 'react-redux';
import {Redirect,Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {editPost} from '../actions';


class PostEdit extends React.Component {


    renderInput({input,type}){
        return (
            <div>
                <input {...input} type={type} maxLength="150" required/>
            </div>
        );
    }

    onSubmit = (values) => {
        this.props.editPost(values,this.props.user.access_token,this.props.post.id)
    }


    render(){
        if(!this.props.user.isLoggedIn || !(this.props.post.username === this.props.user.username)){
            return <Redirect to='/'/>
        }
        return (
        <div>
            {this.props.post.post}
            <div>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="post" type="text" component={this.renderInput}/>
                <button>Edit</button>
            </form>
            </div>
            <Link to={`/dashboard`}>Dashboard</Link>
        </div>
        
        );
    }
}

const mapStateToProps = (state,ownProps) => {
    return {user: state.user, post: state.post[ownProps.match.params.id]};
};


export default connect(mapStateToProps,{editPost})(reduxForm({
    form: 'editedForm'
})(PostEdit));