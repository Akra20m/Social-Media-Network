import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";
import postsReducer from "./postReducer";
import userPostsReducer from "./userPostsReducer";
import commentReducer from "./commentReducer";
import avatarReducer from "./avatarReducer";

export default combineReducers({
  form: formReducer,
  user: userReducer,
  post: postsReducer,
  userPost: userPostsReducer,
  comment: commentReducer,
  avatar: avatarReducer
});
