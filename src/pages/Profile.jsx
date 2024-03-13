import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";
import { actions } from "../actions";

const Profile = () => {
    const {state, dispatch} = useProfile();
    const { api } = useAxios();
    const { auth } = useAuth();

    //id = ${auth?.user?.id}
    useEffect(() => {
       dispatch({type: actions.profile.Data_Fetching});

        const fetchProfile = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/3d2dde4b6548275fb066`);
                
               if(response.status === 200){
                dispatch({type: actions.profile.Data_Fetched, data: response.data})
               }
            } catch (error) {
                console.error(error); 
                dispatch({type: actions.profile.Data_Fetch_Error, error: error.message})
            }
        }
        fetchProfile();
    }, [api, dispatch]);

    if (state?.loading){
        return <p>Fetching your profile data...</p>
    }

    return (
        <div>
            <h1>{state.user}</h1>
            <h1>blog length {state.blogs.length}</h1>
        </div>
    );
};

export default Profile;