import { useEffect, useReducer, useRef, useState } from "react";
import { blogReducer, initialState } from "../../reducer/blogReducer";
import { actions } from "../../actions";
import { api } from "../../api";
import BlogCard from "../../components/blog/BlogCard";

const BlogContents = () => {
    const [state, dispatch] = useReducer(blogReducer, initialState);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);

    useEffect(() => {
        const fetchblogs = async () => {
            try {
                const response = await api.get(`/blogs?page=${page}`);

                if (response.status === 200 && response.data.blogs.length !== 0) {
                    dispatch({ type: actions.blogs.Data_Fetched, data: response.data });
                    setPage((prevPage) => prevPage + 1);
                } else {
                    setHasMore(false)
                }

            } catch (error) {
                console.error(error);
            }
        }

        const onIntersection = (items) => {
            const loaderItem = items[0];

            if (loaderItem.isIntersecting && hasMore) {
                fetchblogs();
            }
        };

        const observer = new IntersectionObserver(onIntersection);

        if (observer && loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        // cleanup
        return () => {
            if (observer) observer.disconnect();
        };

    }, [hasMore, page]);

    return (
        <>
            <div className="space-y-3 md:col-span-5">
                {
                    state?.blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
                }

                {
                    hasMore ? (
                        <div ref={loaderRef} className="text-center text-2xl py-10">Loading more blogs...</div>
                    ) : (
                        <div className="text-center text-2xl py-10">All blogs have been loaded. There are no more blogs.</div>
                    )
                }
            </div>


        </>
    );
};

export default BlogContents;