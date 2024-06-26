import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const SingleProfileBlogCard = ({ blog }) => {
    const avatarSrc = blog.author.avatar ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${blog.author.avatar}` : null;

    const firstLetter = blog.author.firstName?.slice(0, 1);

    return (
        <div className="blog-card">
            <Link to={`/singleBlog/${blog.id}`}>
                <img className="blog-thumb" src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${blog.thumbnail}`} alt="" />
            </Link>

            <div className="mt-2 relative">
                <Link to={`/singleBlog/${blog.id}`}>
                    <h3 className="text-slate-300 text-xl lg:text-2xl">{blog.title}</h3>
                </Link>

                <Link to={`/singleBlog/${blog.id}`}>
                    <p className="mb-6 text-base text-slate-500 mt-1">
                        {blog.content}
                    </p>
                </Link>

                {/* Meta Informations */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center capitalize space-x-2">
                        <div className="avater-img bg-indigo-600 text-white">
                            {
                                avatarSrc ? (
                                    <img className="w-10 h-10 rounded-full" src={avatarSrc} alt="avatar" />
                                ) : (
                                    <span className="">{firstLetter}</span>
                                )
                            }
                        </div>

                        <div>
                            <Link to={`/profile/${blog?.author?.id}`} className="text-slate-500 text-sm">{blog.author.firstName} {blog.author.lastName}</Link>
                            <div className="flex items-center text-xs text-slate-700">
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm px-2 py-1 text-slate-700">
                        <span>{blog.likes.length} Likes</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProfileBlogCard;