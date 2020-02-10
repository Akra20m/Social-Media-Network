import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createComment,fetchComments} from '../actions';
import ReactEmoji from 'react-emoji';
import {avatarInfo} from '../helper';

import '../style.css';



class Comment extends React.Component {

    renderInput({input,placeholder}){
        return (
               <textarea className="input-comment" {...input} maxLength="150" placeholder={placeholder} rows="2" required></textarea>
        );
    }

    onSubmit = (values) => {
        let newValues = {
            "comment": values[`comment${this.props.id}`]
        }
        this.props.createComment(this.props.id,newValues,this.props.user.access_token);
        this.props.change(`comment${this.props.id}`,null);
    }
    componentDidMount(){
        this.props.fetchComments(this.props.id,this.props.user.access_token);
    }
    renderComments = (id) => {
        if(this.props.comment[`${id}`]){
            return this.props.comment[`${id}`].map(comment => {
                return (
                    <div className="comment" key={comment.id}>
                        <div className="post-text-container">{ReactEmoji.emojify(comment.comment)}</div>
                        <img src={this.props.avatar[comment.username]? avatarInfo[this.props.avatar[comment.username].avatar]: "https://semantic-ui.com/images/avatar2/large/elyse.png"} alt="image" className="ui avatar image"/>
                        <div className="post-username-container">{comment.username}</div>
                        <div className="post-date-container">{comment.date.substr(0,10)}</div>
                    </div>
                );
            });
    }}

    render(){
        return (
            <div className="input-comment-container">
            {this.renderComments(this.props.id)}
            <form className="comment-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name={`comment${this.props.id}`}  type="text" placeholder="Write a Comment" component={this.renderInput}/>
                <button className="post-button">Comment</button>
            </form>
            {/* <button onClick={this.loadOnClick()}>Load Comments</button> */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {user: state.user, comment: state.comment, avatar:state.avatar};
};

export default connect(mapStateToProps,{createComment,fetchComments})(reduxForm({
    form: 'comment'
})(Comment));