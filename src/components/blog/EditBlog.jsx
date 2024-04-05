import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
import { MdError } from "react-icons/md";
import close from "../../assets/icons/close.svg";
import { useLocation } from "react-router-dom";

const EditBlog = ({ blogId, onClose, refetch, setShowModal, updateBlog, setUpdateBlog }) => {
    const { state } = useProfile();
    const { api } = useAxios();
    const location = useLocation();
    const blog = state?.blogs.find(blog => blog.id === blogId);

    const [formData, setFormData] = useState({
        title: blog?.title || "",
        tags: blog?.tags || "",
        content: blog?.content || "",
        thumbnail: null
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, thumbnail: file });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!formData.title) {
            formErrors.title = "Title is required";
        }
        if (!formData.tags) {
            formErrors.tags = "Tags are required";
        }
        if (!formData.content) {
            formErrors.content = "Content is required";
        }
        if (!formData.thumbnail) {
            formErrors.thumbnail = "Thumbnail is required";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("content", formData.content);
            formDataToSend.append("tags", formData.tags);
            formDataToSend.append("thumbnail", formData.thumbnail);

            const response = await api.patch(`/blogs/${blogId}`, formDataToSend);
            if (response.status === 200) {
                toast.success('Your blog updated successfully!', {
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
                setShowModal(false);
                if (location.pathname === "/") {
                    setUpdateBlog({
                        ...updateBlog,
                        state: true,
                        blog: response.data
                    })
                } else {
                    refetch();
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
            <div className="relative w-[40%] mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
                <form onSubmit={onSubmit} className="p-5 m-0">
                    <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                        <input
                            className="ml-5"
                            id="file"
                            type="file"
                            name="thumbnail"
                            onChange={handleFileChange}
                        />
                    </div>
                    {errors.thumbnail && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> {errors.thumbnail}</span>}

                    <div className="mb-6 mt-6">
                        <input
                        className="w-full focus:ring-0 shadow-none border-none outline-none placeholder:text-xl text-3xl pl-0 font-bold bg-transparent appearance-none focus:border-none focus:outline-none"
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter your blog title"
                        />
                        {errors.title && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> {errors.title}</span>}
                    </div>

                    <div className="mb-6">
                        <input
                        className="w-full focus:ring-0 shadow-none border-none outline-none placeholder:text-xl text-3xl pl-0 font-bold bg-transparent appearance-none focus:border-none focus:outline-none"
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                        />
                        {errors.tags && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> {errors.tags}</span>}
                    </div>

                    <div className="cre mb-6 ">
                        <textarea
                        className="w-full focus:ring-0 border-none outline-none placeholder:text-lg text-lg pl-0  bg-transparent appearance-none focus:border-none focus:outline-none"
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your blog content"
                            rows="5"
                        ></textarea>
                        {errors.content && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> {errors.content}</span>}
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    >
                        Update Blog
                    </button>
                </form>
                <button onClick={onClose}>
                    <img src={close} alt="Close" className="absolute right-2 top-2 cursor-pointer w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

export default EditBlog;
