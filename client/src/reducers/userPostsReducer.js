import _ from "lodash";
import { fetchUserPosts, editPost, deletePost } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_USER_POSTS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "DELETE_POST":
      return _.omit(state, action.payload);
    case "EDIT_USER_POST":
      return { ...state, ..._.mapKeys([action.payload], "id") };
    default:
      return state;
  }
};
