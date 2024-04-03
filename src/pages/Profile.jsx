import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyBlogs from "../components/blog/MyBlogs";
import { useParams } from "react-router-dom";
import { api } from "../api";

const Profile = () => {
    const { id } = useParams();
    const { state, dispatch } = useProfile();
    
    useEffect(() => {
        dispatch({ type: actions.profile.Data_Fetching });

        const fetchProfile = async () => {
            try {
                const response = await api.get(`/profile/${id}`);

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
    }, [dispatch, id]);

    if (state?.loading) {
        return <p>Fetching your profile data...</p>
    }
    
    return (
        <div className="mx-auto max-w-[1020px] py-8">
            <ProfileInfo />
            <MyBlogs/>
        </div>
    );
};

export default Profile;