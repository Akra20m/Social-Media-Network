import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import '../style.css';

class Personal extends React.Component {
    render() {
        return(
            <div className="personal-container">
                <div className="image-container">
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg"} alt="image" className="image-personal"/>
                </div>
                <div>
                    Username: {this.props.user.username}<br/>
                    Email: {this.props.user.email}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.user};
};

export default connect(mapStateToProps,{})(reduxForm({
    form: 'file'
})(Personal));