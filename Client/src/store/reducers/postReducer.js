import { GET_MY_POINTS, POST_LOADING, GET_POSTS } from "../types";

const initialState = {
    posts: [],
    myPoints: [],
    pagination: {},
    loading: false,
};

export default (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case GET_MY_POINTS:
            return {
                ...state,
                loading: true,
                myPoints: payload.headers.pagination.CurrentPage == 1 ? [...payload.data] : [...state.myPoints, ...payload.data],
                pagination: JSON.parse(payload.headers.pagination)
            };
        case POST_LOADING:
            return {
                ...state,
                loading: payload
            };
        case GET_POSTS:
            return {
                ...state,
                loading: true,
                posts: payload.headers.pagination.CurrentPage == 1 ? [...payload.data] : [...state.posts, ...payload.data],
                pagination: JSON.parse(payload.headers.pagination)
            };
        default:
            return state;
    }
};  