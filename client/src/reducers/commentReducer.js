import _ from 'lodash';
import {createComment} from '../actions';


export default (state={}, action) => {
    switch(action.type) {
        case 'CREATE_COMMENT':
            return {...state,...action.payload};
        case 'FETCH_COMMENTS':
            return {...state,...action.payload};
        default:
            return state;
    }
};