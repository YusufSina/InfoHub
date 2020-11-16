import { GET_MY_POINTS, POST_LOADING } from "../types";

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
        default:
            return state;
    }
};  