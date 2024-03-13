import { useState } from "react";
import edit from "../../assets/icons/edit.svg";
import check from "../../assets/icons/check.svg";
import { useProfile } from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

const ProfileBio = () => {
    const { state, dispatch } = useProfile();
    const { api } = useAxios();
    const [bio, setBio] = useState(state?.user?.bio);
    const [editMode, setEditMode] = useState(false);

    const handleBioEdit = async () => {
        dispatch({ type: actions.profile.Data_Fetching });

        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`, { bio });
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.User_Data_Edited,
                    data: response.data,
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
                            {state?.user?.bio}
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