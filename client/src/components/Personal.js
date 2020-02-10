import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import AvatarDropdown from './AvatarDropdown';
import {avatarInfo} from '../helper';

import '../style.css';

class Personal extends React.Component {
    render() {
        return(
            <div className="personal-container">
                <div className="image-container">
                    <img src={this.props.avatar[this.props.user.username]? avatarInfo[this.props.avatar[this.props.user.username].avatar]: "https://semantic-ui.com/images/avatar2/large/elyse.png"} alt="image" className="ui large image"/>
                </div>
                <div className="info-container">
                    <span className="info-text">Username:</span> {this.props.user.username}<br/>
                    <span className="info-text">Email:</span> {this.props.user.email}
                    <div className="dropdown-icon">
                        <AvatarDropdown/>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.user, avatar:state.avatar};
};

export default connect(mapStateToProps,{})(reduxForm({
    form: 'file'
})(Personal));