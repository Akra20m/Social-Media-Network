import flaskAPI from '../api/flaskapi';

export const createUser = values => async dispatch => {
    try {
    const response = await flaskAPI.post('/users', values);
    dispatch({type: 'REGISTER_USER', payload: {status:response.status}})
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
        const response = await flaskAPI.get('/posts',{
        headers: {
        Authorization: `Bearer ${token}`}});
        dispatch({type: 'FETCH_POSTS', payload: response.data});
    } catch(err) {
        if(err.response.status === 401){
            dispatch({type: 'AUTH_ERROR', payload: {isLoggedIn: false, access_token: ""}})
        }
      }
}


export const fetchSomePosts = (token,id) => async dispatch => {
    try {
        const response = await flaskAPI.get(`/posts/${id}`,{
        headers: {
        Authorization: `Bearer ${token}`}});
        dispatch({type: 'FETCH_POSTS', payload: response.data[0]});
        dispatch({type: 'NO_MORE', payload: response.data[1]});

    } catch(err) {
        if(err.response.status === 401){
            dispatch({type: 'AUTH_ERROR', payload: {isLoggedIn: false, access_token: ""}})
        }
      }
}

export const fetchUserPosts = (token,username,id) => async dispatch => {
    try {
        const response = await flaskAPI.get(`/users/${username}/${id}`,{
        headers: {
        Authorization: `Bearer ${token}`}});
        dispatch({type: 'FETCH_USER_POSTS', payload: response.data[0]});
        dispatch({type: 'NO_MORE', payload: response.data[1]});

    } catch(err) {
        if(err.response.status === 401){
            dispatch({type: 'AUTH_ERROR', payload: {isLoggedIn: false, access_token: ""}})
        }
      }
}

export const createPost = (values,token) => async dispatch => {
    try{
        const response = await flaskAPI.post('/posts',values, {
            headers: {
            Authorization: `Bearer ${token}`}});
            dispatch({type: 'CREATE_POST', payload: response.data});
    } catch(err){ console.log(err.response)};
}

export const logoutUser = (token) => async dispatch => {
    try {
        const response = await flaskAPI.delete('/logout', {
            headers: {
            Authorization: `Bearer ${token}`
        }});
        dispatch({type: 'LOGOUT_USER', payload: response.data});
    } catch(err){ console.log(err.response)};
};

export const deletePost = (token,id) => async dispatch => {
    try {
        const response = await flaskAPI.delete(`/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
        dispatch({type: 'DELETE_POST', payload: id});
        } catch(err){console.log(err.response)}
};

export const editPost = (values,token,id,type) => async dispatch => {
    try {
        const response = await flaskAPI.put(`/posts/${id}`,values, {
            headers: {
            Authorization: `Bearer ${token}`
        }})
        if(type===1) dispatch({type: 'EDIT_POST', payload: response.data});
        else if(type===2)dispatch({type: 'EDIT_USER_POST', payload: response.data});
        } catch(err) {console.log(err.response)};
};

export const createComment = (id,values,token) => async dispatch => {

    try{
        const response = await flaskAPI.post(`/comments/${id}`,values, {
            headers: {
            Authorization: `Bearer ${token}`}});
            let obj={[id]:response.data}
            console.log(obj);
            dispatch({type: 'CREATE_COMMENT', payload: obj});
    } catch(err){ console.log(err.response)};
}

export const fetchComments = (id,token) => async dispatch => {
    try{
        const response = await flaskAPI.get(`/comments/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`}});
            let obj={[id]:response.data}
            console.log(obj);
            dispatch({type: 'FETCH_COMMENTS', payload: obj});
    } catch(err){ console.log(err.response)};
}