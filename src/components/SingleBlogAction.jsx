import heart from "../assets/icons/heart.svg";
import heartFilled from "../assets/icons/heart-filled.svg";
import comment from "../assets/icons/comment.svg";
import like from "../assets/icons/like.svg";
import useAxios from "../hooks/useAxios";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const SingleBlogAction = ({ singleBlog, refetch }) => {
    const { auth } = useAuth();
    const { api } = useAxios();

    const handleLike = async () => {
        try {
            const response = await api.post(`/blogs/${singleBlog?.id}/like`);
            if (response.status === 200) {
                refetch();
            }
        } catch (error) {
            if (error.response.status === 403) {
                toast.error('Please Login your account!', {
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
            console.error(error)
        }
    }

    const handleFavourite = async () => {
        try {
            const response = await api.patch(`/blogs/${singleBlog?.id}/favourite`);
            if (response.status === 200) {
                refetch();
            }

        } catch (error) {
            if (error.response.status === 403) {
                toast.error('Please Login your account!', {
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
            console.error(error)
        }
    }

    return (
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li onClick={handleLike}>
                    <img src={like} alt="like" />
                    <span>{`${singleBlog?.likes?.length > 0 ? singleBlog?.likes?.length : ""}`}</span>
                </li>

                <li onClick={handleFavourite}>
                    {
                        (auth?.authToken && singleBlog?.isFavourite) ? (
                            <img src={heartFilled} alt="Favourite" />
                        ) : (
                            <img src={heart} alt="Favourite" />
                        )
                    }
                </li>

                <a href="#comments">
                    <li>
                        <img src={comment} alt="Comments" />
                        <span>{`${singleBlog?.comments?.length > 0 ? singleBlog?.comments?.length : ""}`}</span>
                    </li>
                </a>
            </ul>
        </div>
    );
};

export default SingleBlogAction;