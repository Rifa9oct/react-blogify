import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";

const Profile = () => {
    const { state, dispatch } = useProfile();
    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        dispatch({ type: actions.profile.Data_Fetching });

        const fetchProfile = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);

                if (response.status === 200) {
                    dispatch({ type: actions.profile.Data_Fetched, data: response.data })
                }
            } catch (error) {
                console.error(error);
                dispatch({ type: actions.profile.Data_Fetch_Error, error: error.message })
            }
        }
        fetchProfile();

        return () => {
            dispatch({ type: actions.profile.Clear_Data });
        };
    }, [api, dispatch, auth?.user?.id]);

    if (state?.loading) {
        return <p>Fetching your profile data...</p>
    }

    return (
        <div className="mx-auto max-w-[1020px] py-8">
            <ProfileInfo />
        </div>
    );
};

export default Profile;