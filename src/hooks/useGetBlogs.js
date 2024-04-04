import { blogReducer, initialState } from "../reducer/blogReducer";
import { actions } from "../actions";
import { api } from "../api";
import { useEffect, useState, useRef, useReducer } from "react";

export const useGetBlogs = () => {
    const [state, dispatch] = useReducer(blogReducer, initialState);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
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
                fetchblogs()
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [hasMore, page]);

    return {
        state,
        loaderRef,
        hasMore
    };
};
