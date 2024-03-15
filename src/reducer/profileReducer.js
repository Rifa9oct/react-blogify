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
                user: action.data,
                blogs: action.data?.blogs,
            };
        }
        case actions.profile.User_Data_Edited: {
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    bio: action.data.bio
                }
            };
        }
        case actions.profile.Image_Updated: {
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    avatar: action.data.avatar
                }
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