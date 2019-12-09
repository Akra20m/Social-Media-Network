import flaskAPI from '../api/flaskapi';

export const createUser = values => async dispatch => {
    const response = await flaskAPI.post('/users', values).catch(err => console.log(err.response));
    
    //add reducers to show the message
    //dispatch({type:'CREATE_USER', payload:response.data});
};

export const loginUser = values => async dispatch => {
    const response = await flaskAPI.post('/login',values).catch(err => console.log(err.response));
    dispatch({type: 'LOGIN_USER', payload: response.data});
};

export const fetchPosts = (token) => async dispatch => {
    const response = await flaskAPI.get('/posts', {
        headers: {
        Authorization: `Bearer ${token}`
    }
}).catch(err => console.log(err.response));
    dispatch({type: 'FETCH_POSTS', payload: response.data});
};

export const createPost = (values,token) => async dispatch => {
    const response = await flaskAPI.post('/posts',values, {
        headers: {
        Authorization: `Bearer ${token}`
    }
}).catch(err => console.log(err.response));
    dispatch({type: 'CREATE_POST', payload: response.data});

};

export const logoutUser = (token) => async dispatch => {
    const response = await flaskAPI.delete('/logout', {
        headers: {
        Authorization: `Bearer ${token}`
    }
}).catch(err => console.log(err.response));
    dispatch({type: 'LOGOUT_USER', payload: response.data});
};

export const deletePost = (token,id) => async dispatch => {
    const response = await flaskAPI.delete(`/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).catch(err => console.log(err.response))
    dispatch({type: 'DELETE_POST', payload: id});
};

export const editPost = (values,token,id) => async dispatch => {
    const response = await flaskAPI.put(`/posts/${id}`,values, {
        headers: {
        Authorization: `Bearer ${token}`
    }
}).catch(err => console.log(err.response));
    dispatch({type: 'EDIT_POST', payload: response.data});

};
