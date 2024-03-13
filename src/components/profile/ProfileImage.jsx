import { useRef } from "react";
import { actions } from "../../actions";
import edit from "../../assets/icons/edit.svg"
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

const ProfileImage = () => {
    const { auth } = useAuth();
    const firstLetter = auth.user?.firstName.slice(0, 1);
    const { state, dispatch } = useProfile();
    const { api } = useAxios();
    const fileUploaderRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();

        fileUploaderRef.current.addEventListener("change", updateImageDisplay);
        fileUploaderRef.current.click();
    };

    const updateImageDisplay = async () => {
        dispatch({ type: actions.profile.Data_Fetching });
        
        try {
            const formData = new FormData();
            for (const file of fileUploaderRef.current.files) {
                formData.append("avatar", file);
            }

            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}/avatar`, formData);
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.Image_Updated,
                    data: response.data,
                });
            }
        } catch (error) {
            dispatch({
                type: actions.profile.Data_Fetch_Error,
                error: error.message,
            });
        }
    };

    return (
        <div
            className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
        >
            <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                <span className="">{firstLetter}</span>
            </div>

            <form>
                <button
                    onClick={handleImageUpload}
                    className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
                >
                    <img src={edit} alt="Edit" />
                </button>
                <input id="file" type="file" ref={fileUploaderRef} hidden />
            </form>
        </div>
    );
};

export default ProfileImage;