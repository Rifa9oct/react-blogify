import deleteIcon from "../assets/icons/delete.svg";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";
import { Bounce, toast } from "react-toastify";

const Comments = ({ singleBlog, refetch }) => {
    const { auth } = useAuth();
    const { state } = useProfile();
    const user = state?.user ?? auth?.user;
    const { api } = useAxios();
    const [commentValue, setCommentValue] = useState('');

    const currentUser = singleBlog?.comments.find( comment => comment.author.id === user?.id);

    const avatarSrc = user?.avatar ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${user?.avatar}` : null;

    const firstLetter = singleBlog?.author?.firstName?.slice(0, 1);

    const handleComment = async (e) => {
        e.preventDefault();
        const content = e.target.content.value;
        try {
            const response = await api.post(`/blogs/${singleBlog?.id}/comment`, { content });
            if (response.status === 200) {
                setCommentValue('');
                toast.success('Comment successful !', {
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
                refetch();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (commentId) => {
        try {
            const response = await api.delete(`/blogs/${singleBlog?.id}/comment/${commentId}`);
            if (response.status === 200) {
                toast.success('Delete successfully !', {
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
                refetch();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mx-auto w-full md:w-10/12 container">
            <h2 className="text-3xl font-bold my-8">Comments ({singleBlog?.comments.length})</h2>
            {
                auth?.authToken && (
                    <div className="flex items -center space-x-4">
                        {
                            avatarSrc ? (
                                <img className="w-10 h-10 rounded-full"
                                    src={avatarSrc} alt="avatar" />
                            ) : (
                                <div className="avater-img bg-orange-600 text-white">
                                    <span className="">{firstLetter}</span>
                                </div>
                            )
                        }

                        <form onSubmit={(e) => handleComment(e)} className="w-full">
                            <textarea
                                name="content"
                                value={commentValue}
                                onChange={(e) => setCommentValue(e.target.value)}
                                className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                                placeholder="Write a comment"
                            ></textarea>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                >
                                    Comment
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }

            {
                singleBlog?.comments.map(comment => (
                    <div key={comment.id} className="flex items-start space-x-4 my-8">
                        {
                            comment.author.avatar ? (
                                <img className="w-10 h-10 rounded-full"
                                    src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${comment?.author?.avatar}`} alt="avatar" />
                            ) : (
                                <div className="avater-img bg-orange-600 text-white">
                                    <span className="">{firstLetter}</span>
                                </div>
                            )
                        }

                        <div className="w-full">
                            <div className="flex gap-2 items-center">
                                <h5 className="text-slate -500 font-bold">{comment.author.firstName} {comment.author.lastName}</h5>
                                {
                                  (currentUser?.author.id === comment.author.id) && (
                                        <button onClick={() => handleDelete(comment.id)}>
                                            <img src={deleteIcon} alt="" />
                                        </button>
                                    )
                                }
                            </div>
                            <p className="text-slate-300">
                                {comment.content}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Comments;