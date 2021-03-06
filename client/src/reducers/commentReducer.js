import _ from "lodash";
import { createComment, fetchComments, deleteComment } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case "CREATE_COMMENT":
      return { ...state, ...action.payload };
    case "FETCH_COMMENTS":
      return { ...state, ...action.payload };
    case "DELETE_COMMENT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
