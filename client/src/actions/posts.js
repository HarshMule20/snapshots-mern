import * as api from '../api';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({type: 'FETCH_ALL', payload: data})                                    // returning the action (type and state)
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    console.log("thi sis", post)
    try {
        const { data } = await api.createPost(post);
        console.log(data)
        dispatch({type: 'CREATE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}