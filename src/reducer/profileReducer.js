import { actions } from "../actions";

const initialState = {
    user: null,
    blogs: [],
    loading: false,
    error: null,
};

const profileReducer = (state, action) => {
    switch (action.type) {
        case actions.profile.Data_Fetching: {
            return {
                ...state,
                loading: true,
            };
        }
        case actions.profile.Data_Fetched: {
            return {
                ...state,
                loading: false,
                user: action.data.firstName,
                blogs: action.data.blogs,
            };
        }
        case actions.profile.Data_Fetch_Error: {
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

export { initialState, profileReducer };