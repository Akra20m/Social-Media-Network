import React from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateAvatar } from "../actions";
import { avatarOptions } from "../helper";

class AvatarDropdown extends React.Component {
  onAvatarChange = (e, data) => {
    this.props.updateAvatar(
      data.value,
      this.props.user.username,
      this.props.user.access_token
    );
  };

  render() {
    return (
      <Dropdown
        text="Update Avatar"
        icon="file image icon"
        floating
        labeled
        button
        className="icon"
      >
        <Dropdown.Menu>
          <Dropdown.Header content="Pick your avatar" />
          {avatarOptions.map(option => (
            <Dropdown.Item
              onClick={this.onAvatarChange}
              key={option.value}
              {...option}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, { updateAvatar })(AvatarDropdown);
