import { useProfile } from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyBlogs from "../components/blog/MyBlogs";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../hooks/useAuth";
import SingleProfileInfo from "../components/SingleProfile/SingleProfileInfo";
import SingleProfileBlogs from "../components/SingleProfile/SingleProfileBlogs";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
    const { auth } = useAuth();
    const { id } = useParams();
    const { state, dispatch } = useProfile();
    const isMe = id === auth?.user?.id;

    const { data: profileInfo, refetch } = useQuery({
        queryKey: ['profileInfo'],
        queryFn: async () => {
            try {
                const response = await api.get(`/profile/${id}`);

                if (response.status === 200) {
                    if (isMe) {
                        dispatch({ type: actions.profile.Data_Fetched, data: response.data })
                    } else {
                        return response.data;
                    }
                }
                return null;
            } catch (error) {
                console.error(error);
                dispatch({ type: actions.profile.Data_Fetch_Error, error: error.message })
            }
        }
    })
   
    if (state?.loading) {
        return <p>Fetching your profile data...</p>
    }

    return (
        <div className="mx-auto max-w-[1020px] py-8">
            {
                isMe ? (
                    <>
                        <ProfileInfo />
                        <MyBlogs refetch={refetch} />
                    </>
                ) : (
                    <>
                        {
                            profileInfo && (
                                <>
                                    <SingleProfileInfo profileInfo={profileInfo} />
                                    <SingleProfileBlogs profileInfo={profileInfo} />
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

export default Profile;