import {loginUser,logoutUser} from '../actions';

export default (state={}, action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            return {...state, ...action.payload}
        case 'LOGOUT_USER':
            return {...state, ...action.payload}
        default:
            return state;
    }
};