import {loginUser,logoutUser,fetchPosts} from '../actions';

export default (state={status:200}, action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            return {...state, ...action.payload}
        case 'LOGOUT_USER':
            return {...state, ...action.payload}
        case 'LOGIN_ERROR':
            return {...state, ...action.payload}
        case 'REGISTER_ERROR':
            return {...state, ...action.payload}
        case 'AUTH_ERROR':
            return {...state, ...action.payload}
        default:
            return state;
    }
};