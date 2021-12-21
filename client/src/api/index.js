import axios from 'axios';

const url = axios.create({ baseURL: 'http://localhost:5000'});

export const fetchPosts = () => url.get("/posts");
export const createPost = (newPost) => url.post("/posts", newPost)