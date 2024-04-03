import { Link, useParams } from "react-router-dom";
import Footer from "./Home/Footer";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { formatDate } from "../utils/formatDate";
import Comments from "../components/Comments";
import SingleBlogAction from "../components/SingleBlogAction";

const SingleBlog = () => {
    const { id } = useParams();
    const { api } = useAxios();

    const { data: singleBlog, refetch } = useQuery({
        queryKey: ['singleBlog'],
        queryFn: async () => {
            try {
                const res = await api.get(`/blogs/${id}`);
                if (res.status === 200) {
                    return res.data;
                }
            } catch (error) {
                console.log(error)
            }
        }
    })

    const avatarSrc = singleBlog?.author?.avatar ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${singleBlog?.author?.avatar}` : null;

    const firstLetter = singleBlog?.author?.firstName?.slice(0, 1);

    return (
        <>
            <div>
                <div className="container text-center py-8">
                    <h1 className="font-bold text-3xl md:text-5xl">{singleBlog?.title}</h1>
                    <div className="flex justify-center items-center my-4 gap-4">
                        <div className="flex items-center capitalize space-x-2">
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

                            <Link to={`/profile/${singleBlog?.author?.id}`} className="text-slate-500 text-sm">{singleBlog?.author?.firstName} {singleBlog?.author?.lastName}</Link>
                        </div>
                        <span className="text-sm text-slate-700 dot">{formatDate(singleBlog?.createdAt)}</span>
                        <span className="text-sm text-slate-700 dot">{singleBlog?.likes.length} Likes</span>
                    </div>
                    <img className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96" src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${singleBlog?.thumbnail}`} alt="" />

                    <ul className="tags">
                        {
                            singleBlog?.tags.split(",").map((tag, indx) => (
                                <li key={indx}>{tag.trim()}</li>
                            ))
                        }
                    </ul>

                    <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                        {singleBlog?.content}
                    </div>
                </div>
            </div>

            <div id="comments">
                <Comments singleBlog={singleBlog} refetch={refetch} />
            </div>

            <SingleBlogAction singleBlog={singleBlog} refetch={refetch} />
            <Footer />
        </>
    );
};

export default SingleBlog;