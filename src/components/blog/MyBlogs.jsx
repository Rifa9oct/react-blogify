import { useProfile } from "../../hooks/useProfile";
import BlogCard from "./BlogCard";

const MyBlogs = ({refetch}) => {
    const { state } = useProfile();
    const blogs = state?.user?.blogs;
    return (
        <div className="my-6 space-y-4">
            {
                blogs?.map(blog => <BlogCard key={blog.id} blog={blog} refetch={refetch}/>)
            }
        </div>
    );
};

export default MyBlogs;