import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import Footer from "./Home/Footer";
import { api } from "../api";

const CreateBlog = () => {
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);
            
            const tagsArray = data.tags.split(",").map(tag => tag.trim());
            formData.append("tags", JSON.stringify(tagsArray));

            for (const file of data.thumbnail) {
                formData.append("thumbnail", file);
            }
           
            const response = await api.post(`/blogs/`, formData);
            if (response.status === 200){
                console.log(response.data)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} className="createBlog">
                    <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                        <label htmlFor="file" className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                            <p>Upload Your Image</p>
                        </label>
                        <input id="file" type="file" 
                            name="thumbnail"
                            hidden
                            {...register("thumbnail", { required: true })}
                        />
                    </div>
                    {errors.thumbnail && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Thumbnail is required.</span>}

                    <div className="mb-6 mt-6">
                        <input type="text" id="title"
                            name="title"
                            placeholder="Enter your blog title"
                            {...register("title", { required: true })}
                        />
                        {errors.title && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Title is required.</span>}
                    </div>

                    <div className="mb-6">
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                            {...register("tags", { required: true })}
                        />
                        {errors.tags && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Tags is required.</span>}
                    </div>

                    <div className="mb-6">
                        <textarea id="content" name="content"
                            placeholder="Write your blog content" rows="8"
                            {...register("content", { required: true })}
                        ></textarea>
                        {errors.content && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Content is required.</span>}
                    </div>

                    <button
                        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    >
                        Create Blog
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CreateBlog;
