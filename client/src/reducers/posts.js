export default (posts = [], action) => {       // posts is a state for state management
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;                       
        case 'CREATE':
            console.log("posts", posts)
            console.log("action", action)
            return [...posts, action.payload];                       // for now just returning state instead of any filtered state
        default:
            return posts;                       // always returns state
    }
}