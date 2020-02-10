import _ from 'lodash';
import {fetchAvatars,updateAvatar} from '../actions';


export default (state={}, action) => {
    switch(action.type) {
        case 'FETCH_AVATARS':
            return {...state,..._.mapKeys(action.payload, 'username')};
        case 'UPDATE_AVATAR':
            return {...state,..._.mapKeys(action.payload, 'username')};
        default:
            return state;
    }
};

