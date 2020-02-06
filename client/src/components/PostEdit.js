import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Redirect,Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {editPost} from '../actions';
import '../style.css';


class PostEdit extends React.Component {

    renderInput({input}){
        return (
            <div>
                {/*<input {...input} type={type} maxLength="150" required/>*/}
                <textarea className="input-post" {...input} maxLength="150" placeholder={"Edit post"} rows="3" required></textarea>

            </div>
        );
    }

    onSubmit = (values) => {
        this.props.editPost(values,this.props.user.access_token,this.props.post.id,this.props.type);
    }

    render(){
        if(!this.props.user.isLoggedIn || !(this.props.post.username === this.props.user.username)){
            return <Redirect to='/'/>
        }
        return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active" style={{position:"fixed"}}>
            <div className="ui standard modal visible active">
            <div className="header">
                {this.props.post.post}
            </div>
            <div className="content">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} id="editForm">
                <Field name="post" component={this.renderInput}/>
            </form>
            </div>
            <div className="actions">
                <div className="ui buttons">
                <button className="ui positive button" form="editForm">Edit</button>
                <div className="or"></div>
                <button className="ui button" onClick={this.props.editClose}>close</button>
                </div>
            </div>
            </div>
        </div>,
        document.querySelector('#modal')
        );
    }
}

const mapStateToProps = (state,ownProps) => {
   if(ownProps.type===1) return {user: state.user, post: state.post[ownProps.id]};
   else if(ownProps.type===2) return {user: state.user, post: state.userPost[ownProps.id]};
};

export default connect(mapStateToProps,{editPost})(reduxForm({
    form: 'editedForm'
})(PostEdit));