import flaskAPI from '../api/flaskapi';

export const createUser = values => async dispatch => {
    try {
    const response = await flaskAPI.post('/users', values);
    } catch(err) {
        dispatch({type: 'REGISTER_ERROR', payload: {status:err.response.status}})
    }  
}

export const loginUser = values => async dispatch => {
    try {
        const response = await flaskAPI.post('/login',values);
        dispatch({type: 'LOGIN_USER', payload: {...response.data, status:response.status}});
    } catch(err) {
      dispatch({type: 'LOGIN_ERROR', payload: {status:err.response.status}})
    }
}

export const fetchPosts = (token) => async dispatch => {
    try {
        const response = await flaskAPI.get('/posts', {
        headers: {
        Authorization: `Bearer ${token}`}});
        dispatch({type: 'FETCH_POSTS', payload: response.data});
    } catch(err) {
        console.log(err.response);
        dispatch({type: 'AUTH_ERROR', payload: {isLoggedIn: false, access_token: ""}})
      }
}

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
