import { useEffect, useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";

const PopularSidebar = () => {
    const [popular, setPopular] = useState();

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const res = await api.get("/blogs/popular");
                setPopular(res.data);

            } catch (error) {
                console.error(error)
            }
        }
        fetchedData();
    }, [])

    return (
        <div className="sidebar-card">
            <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                Most Popular 👍️
            </h3>

            <ul className="space-y-5 my-5">
                {
                    popular?.blogs.map(blog => (
                        <li key={blog.id}>
                            <Link to={`/singleBlog/${blog.id}`} className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                                {blog.title}
                            </Link>
                            <p className="text-slate-600 text-sm">
                                by
                                <a href="./profile.html">{blog.author.firstName} {blog.author.lastName}</a>
                                <span>·</span> {blog.likes.length} Likes
                            </p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default PopularSidebar;