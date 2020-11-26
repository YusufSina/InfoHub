import { GET_MY_POINTS, POST_LOADING, GET_POSTS, ADD_POST } from "../types";

const initialState = {
    posts: [],
    myPoints: [],
    pagination: {},
    loading: false,
};

export default (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload.headers.pagination.CurrentPage == 1 ? [...payload.data] : [...state.posts, ...payload.data],
                pagination: JSON.parse(payload.headers.pagination)
            };
        case GET_MY_POINTS:
            return {
                ...state,
                myPoints: payload.headers.pagination.CurrentPage == 1 ? [...payload.data] : [...state.myPoints, ...payload.data],
                pagination: JSON.parse(payload.headers.pagination)
            };
        case ADD_POST:
            console.log(payload);
            return {
                ...state,
                posts:[payload].concat(state.posts)
            };
        case POST_LOADING:
            return {
                ...state,
                loading: payload
            };
        default:
            return state;
    }
};  