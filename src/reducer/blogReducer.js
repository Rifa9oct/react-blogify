import { actions } from "../actions";

const initialState = {
    blogs: [],
};

const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blogs.Data_Fetched: {
            return {
                ...state,
                loading: false,
                blogs: [...state.blogs, ...(action.data && action.data.blogs ? action.data.blogs : [])],
            };
        }
        default: {
            return state;
        }
    }
};

export { initialState, blogReducer };