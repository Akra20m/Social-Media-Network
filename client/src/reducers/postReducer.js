import _ from 'lodash';
import {fetchPosts,createPost,deletePost,editPost} from '../actions';


export default (state={}, action) => {
    switch(action.type) {
        case 'FETCH_POSTS':
            return {...state,..._.mapKeys(action.payload, 'id')};
        case 'CREATE_POST':
            return {...state,..._.mapKeys(action.payload, 'id')};
        case 'DELETE_POST':
            return _.omit(state,action.payload);    
        case 'EDIT_POST':
            return {...state,..._.mapKeys(action.payload, 'id')};
        default:
            return state;
    }
};