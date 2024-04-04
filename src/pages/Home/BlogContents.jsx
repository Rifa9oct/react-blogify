import BlogCard from "../../components/blog/BlogCard";
import { useGetBlogs } from "../../hooks/useGetBlogs";

const BlogContents = () => {
    const {state, hasMore, loaderRef} = useGetBlogs();
   
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