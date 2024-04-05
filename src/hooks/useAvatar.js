import { useProfile } from "./useProfile";

export const useAvatar = (blog) => {
    const { state } = useProfile();

    const isMe = blog?.author?.id === state?.user?.id;
    const avatar = isMe ? `${state?.user?.avatar}` : `${blog?.author?.avatar}`;

    const avatarURL = avatar === "null"? null : `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${avatar}`;

    return { avatarURL };
};