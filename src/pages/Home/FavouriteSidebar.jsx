import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const FavouriteSidebar = () => {
    const { auth } = useAuth();
    const { api } = useAxios();
    const [favourites, setFavourites] = useState(auth?.user?.favourites);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/blogs/favourites");
                setFavourites(res.data.blogs);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [api])

    return (
        <>
            {
                favourites.length > 0 && (
                    <div className="sidebar-card">
                        <h3
                            className="text-slate-300 text-xl lg:text-2xl font-semibold"
                        >
                            Your Favourites ❤️
                        </h3>

                        <ul className="space-y-5 my-5">
                            {
                                favourites.map(favourite => (
                                    <li key={favourite.id}>
                                        <Link to={`/singleBlog/${favourite.id}`}
                                            className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
                                        >
                                            {favourite.title}
                                        </Link>
                                        <p className="text-slate-600 text-sm">
                                            {
                                                favourite.tags.split(",").map((tag, indx, array) => (
                                                    <span key={indx}>
                                                        #{tag.trim()}
                                                        {indx !== array.length - 1 && ', '}
                                                    </span>
                                                ))
                                            }
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </>
    );
};

export default FavouriteSidebar;