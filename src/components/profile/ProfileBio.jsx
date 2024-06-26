import { useEffect, useState } from "react";
import edit from "../../assets/icons/edit.svg";
import check from "../../assets/icons/check.svg";
import { useProfile } from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const ProfileBio = () => {
    const { auth, setAuth } = useAuth();
    const { state, dispatch } = useProfile();
    const { api } = useAxios();
    const [bio, setBio] = useState(state?.user?.bio);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!bio) {
            setBio(auth?.user?.bio);
        }
    }, [auth?.user?.bio, bio])

    const handleBioEdit = async () => {
        dispatch({ type: actions.profile.Data_Fetching });
        try {
            const response = await api.patch("/profile", { bio });
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.User_Data_Edited,
                    data: response.data.user,
                });
                setAuth({
                    ...auth,
                    user:{
                        ...auth?.user,
                        bio: response.data.user.bio
                    }
                })
                toast.success('Bio updated successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
            setEditMode(false);
        } catch (error) {
            dispatch({
                type: actions.profile.Data_Fetch_Error,
                error: error.message,
            });
        }
    };

    return (
        <>
            <div className="mt-4 flex items-start gap-2 lg:mt-6">
                <div className="flex-1">
                    {editMode ? (
                        <textarea
                            className='p-5 className="leading-[188%] text-gray-600 lg:text-lg rounded-md outline-none'
                            value={bio}
                            rows={4}
                            cols={60}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    ) : (
                        <p className="leading-[188%] text-gray-400 lg:text-lg">
                            {bio}
                        </p>
                    )}
                </div>

                {editMode ? (
                    <button
                        className="flex-center h-7 w-7 rounded-full"
                        onClick={handleBioEdit}
                    >
                        <img src={check} alt="Check" />
                    </button>
                ) : (
                    <button
                        className="flex-center h-7 w-7 rounded-full"
                        onClick={() => setEditMode(true)}
                    >
                        <img src={edit} alt="Edit" />
                    </button>
                )}
            </div>
            <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </>
    );
};

export default ProfileBio;