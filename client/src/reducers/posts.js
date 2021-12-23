import { CREATE, DELETE, FETCH_ALL, UPDATE } from "../constants/actionTypes";

export default (posts = [], action) => {       // posts is a state for state management
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;                       
        case CREATE:
            return [...posts, action.payload];                       // for now just returning state instead of any filtered state
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        default:
            return posts;                       // always returns state
    }
}