import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createPost } from "../actions";
import "../style.css";

class CreatePost extends React.Component {
  renderInput({ input, placeholder }) {
    return (
      <textarea
        className="input-post"
        {...input}
        maxLength="150"
        placeholder={placeholder}
        rows="3"
        required
      ></textarea>
    );
  }

  onSubmit = values => {
    this.props.createPost(values, this.props.user.access_token);
    this.props.change("post", null);
  };

  render() {
    return (
      <div className="input-post-container">
        <form
          className="test"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="post"
            type="text"
            placeholder="What are you thinking about?"
            component={this.renderInput}
          />
          <button className="post-button">Post</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, { createPost })(
  reduxForm({
    form: "post"
  })(CreatePost)
);
