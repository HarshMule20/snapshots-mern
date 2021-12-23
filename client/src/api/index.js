import axios from 'axios';

// const url = axios.create({ baseURL: 'http://localhost:5000'});
const url = axios.create({ baseURL: 'https://snapshot20.herokuapp.com'});


export const fetchPosts = () => url.get("/posts");
export const createPost = (newPost) => url.post("/posts", newPost)
export const updatePost = (id, postData) => url.patch(`/posts/${id}`, postData)
export const deletePost = (id) => url.delete(`/posts/${id}`);
export const likePost = (id) => url.patch(`/posts/${id}/likePost`);