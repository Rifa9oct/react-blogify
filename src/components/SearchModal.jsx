import { Link } from "react-router-dom";
import close from "../assets/icons/close.svg";
import { useGetBlogs } from "../hooks/useGetBlogs";
import useDebounce from "../hooks/useDebounce";
import { useState } from "react";

const SearchModal = ({ onClose }) => {
    const { state, hasMore, loaderRef } = useGetBlogs();

    const [search, setSearch] = useState("");

    const doSearch = useDebounce((value) => {
        setSearch(value);
    }, 500);

    function handleChange(e) {
        const value = e.target.value;
        doSearch(value);
    }

    const isMatchFound = (blog, searchText) => {
        const searchLowerCase = searchText.toLowerCase();
        const title_includes = blog.title.toLowerCase().includes(searchLowerCase);
        const content_includes = blog.content.toLowerCase().includes(searchLowerCase);
        return title_includes || content_includes;
    };

    return (
        <div className="fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">

            <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">

                <div>
                    <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">Search for Your Desire Blogs</h3>
                    <form>
                        <input
                            type="text"
                            placeholder="Start Typing to Search"
                            onChange={handleChange}
                            className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
                        />
                    </form>
                </div>

                {/* Search Result  */}
                <div>
                    <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
                    <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                        {
                            state?.blogs.filter(blog => {
                                if (search.trim() === "") {
                                    return true;
                                } else {
                                    return isMatchFound(blog, search);
                                }
                            }).map(blog => (
                                <div key={blog.id} className="flex gap-6 py-2">
                                    <Link onClick={onClose} to={`/singleBlog/${blog.id}`} className="w-[290px] ">
                                        <img className="object-contain" src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${blog.thumbnail}`} alt="" />
                                    </Link>

                                    <div className="mt-2 w-[577px] h-[140px]">
                                        <Link onClick={onClose} to={`/singleBlog/${blog.id}`}>
                                            <h3 className="text-slate-300 text-xl font-bold">{blog.title}</h3>
                                        </Link>
                                        <Link onClick={onClose} to={`/singleBlog/${blog.id}`}>
                                            <p className="mb-6 text-sm text-slate-500 mt-1">
                                                {blog.content}
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }

                        {
                            hasMore ? (
                                <div ref={loaderRef} className="text-center text-2xl py-10">Loading more blogs...</div>
                            ) : (
                                <div className="text-center text-2xl py-10">All blogs have been loaded. There are no more blogs.</div>
                            )
                        }
                    </div>
                </div>

                <button onClick={onClose}>
                    <img src={close} alt="Close" className="absolute right-2 top-2 cursor-pointer w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

export default SearchModal;