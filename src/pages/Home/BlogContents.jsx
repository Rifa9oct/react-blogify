import { useState } from "react";
import BlogCard from "../../components/blog/BlogCard";
import { useGetBlogs } from "../../hooks/useGetBlogs";

const BlogContents = () => {
    const { state, hasMore, loaderRef } = useGetBlogs();
    const [filter, setFilter] = useState({
        state: false,
        blogId: null
    });

    let filterBlogs = state?.blogs;
    if (filter.state) {
        filterBlogs = filterBlogs.filter(blog => blog.id !== filter.blogId)
    }

    return (
        <>
            <div className="space-y-3 md:col-span-5">
                {
                    filterBlogs.map(blog =>
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                            setFilter={setFilter}
                            filter={filter}
                        />)
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