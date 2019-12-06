import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './userReducer';
import postsReducer from './postReducer';

export default combineReducers({
    form: formReducer,
    user: userReducer,
    post: postsReducer
});
