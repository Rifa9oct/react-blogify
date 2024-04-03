import SingleProfileBlogCard from "./SingleProfileBlogCard";

const SingleProfileBlogs = ({profileInfo}) => {
    const {blogs} = profileInfo;
    return (
        <div className="my-6 space-y-4">
            {
                blogs?.map(blog => <SingleProfileBlogCard key={blog.id} blog={blog} />)
            }
        </div>
    );
};

export default SingleProfileBlogs;