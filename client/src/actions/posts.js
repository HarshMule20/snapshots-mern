import * as api from '../api';
import { CREATE, DELETE, FETCH_ALL, UPDATE } from '../constants/actionTypes';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({type: FETCH_ALL, payload: data})                                    // returning the action (type and state)
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    // console.log("thi sis", post)
    try {
        const { data } = await api.createPost(post);
        // console.log(data)
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message)
        
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}