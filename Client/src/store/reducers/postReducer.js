import { GET_MY_POINTS, POST_LOADING, GET_POSTS, ADD_POST, GET_CATEGORIES, POST_ERROR, SET_CATEGORY_NUMBER } from "../types";

const initialState = {
    posts: [],
    myPoints: [],
    categories: [],
    categoryNumber: 1,
    pagination: {},
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case GET_POSTS:
            const pagination = JSON.parse(payload.headers.pagination)
            return {
                ...state,
                posts: pagination.CurrentPage == 1 ? [...payload.data] : [...state.posts, ...payload.data],
                pagination,
                loading: false
            };
        case GET_MY_POINTS:
            return {
                ...state,
                myPoints: payload.headers.pagination.CurrentPage == 1 ? [...payload.data] : [...state.myPoints, ...payload.data],
                pagination: JSON.parse(payload.headers.pagination),
                loading: false
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: [...payload]
            };
        case SET_CATEGORY_NUMBER:
            return {
                ...state,
                categoryNumber: payload
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload].concat(state.posts),
                loading: false,
                error: null
            };
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case POST_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            };
        default:
            return state;
    }
};  