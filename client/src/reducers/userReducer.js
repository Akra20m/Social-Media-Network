import {loginUser,logoutUser,fetchPosts,fetchSomePosts} from '../actions';

export default (state={status:200, avatar:"https://semantic-ui.com/images/avatar/small/stevie.jpg"}, action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            return {...state, ...action.payload}
        case 'LOGOUT_USER':
            return {...state, ...action.payload}
        case 'LOGIN_ERROR':
            return {...state, ...action.payload}
        case 'REGISTER_USER':
            return {...state, ...action.payload}
        case 'REGISTER_ERROR':
            return {...state, ...action.payload}
        case 'AUTH_ERROR':
            return {...state, ...action.payload}
        case 'NO_MORE':
            return {...state, ...action.payload}
        case 'UPDATE_AVATAR':
            return {...state, ...action.payload}
        default:
            return state;
    }
};