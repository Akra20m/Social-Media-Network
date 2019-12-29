import _ from 'lodash';
import {fetchUserPosts} from '../actions';


export default (state={}, action) => {
    switch(action.type) {
        case 'FETCH_USER_POSTS':
            return {...state,..._.mapKeys(action.payload, 'id')};
        default:
            return state;
    }
};