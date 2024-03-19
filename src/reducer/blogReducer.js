import { actions } from "../actions";

const initialState = {
    blogs: [],
    loading: false,
    error: null,
};

const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blogs.Data_Fetching: {
            return {
                ...state,
                loading: true,
            };
        }
        case actions.blogs.Data_Fetched: {
            return {
                ...state,
                loading: false,
                blogs: action.data?.blogs,
            };
        }
        case actions.blogs.Data_Fetch_Error: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        default: {
            return state;
        }
    }
};

export { initialState, blogReducer };