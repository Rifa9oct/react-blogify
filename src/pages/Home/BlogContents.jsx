import { useEffect, useReducer } from "react";
import { blogReducer, initialState } from "../../reducer/blogReducer";
import { actions } from "../../actions";
import { api } from "../../api";
import BlogCard from "../../components/blog/BlogCard";

const BlogContents = () => {
    const [state, dispatch] = useReducer(blogReducer, initialState);
    console.log(state)

    useEffect(() => {
        dispatch({ type: actions.blogs.Data_Fetching });

        const fetchblogs = async () => {
            try {
                const response = await api.get(`/blogs`);

                if (response.status === 200) {
                    dispatch({ type: actions.blogs.Data_Fetched, data: response.data })
                }
            } catch (error) {
                console.error(error);
                dispatch({ type: actions.blogs.Data_Fetch_Error, error: error.message })
            }
        }
        fetchblogs();

        return () => {
            dispatch({ type: actions.blogs.Clear_Data });
        };
    }, []);

    if (state?.loading) {
        return <p>Fetching your data...</p>
    }

    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                <div className="space-y-3 md:col-span-5">
                    {
                        state?.blogs?.map(blog => <BlogCard key={blog.id} blog={blog} />)
                    }
                </div>
            </div>
            
        </div>
    );
};

export default BlogContents;