import logo from "./../../assets/logo.svg"
import search from "./../../assets/icons/search.svg"
import { Link } from "react-router-dom";
import Logout from "../../components/auth/Logout";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";

const Header = () => {
    const { auth } = useAuth();
    const { state } = useProfile();
    // console.log(state)
    const firstLetter = auth.user?.firstName.slice(0, 1);

    return (
        <header>
            <nav className="container">
                <div>
                    <Link to="/">
                        <img className="w-32" src={logo} alt="logo" />
                    </Link>
                </div>
                <div>
                    <ul className="flex items-center space-x-5">
                        <li>
                            <Link to="/createBlog"
                                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                                Write
                            </Link>
                        </li>
                        {
                            auth.authToken ? (
                                <>
                                    {/* search */}
                                    <li>
                                        <a href="./search.html" className="flex items-center gap-2 cursor-pointer">
                                            <img src={search} alt="Search" />
                                            <span>Search</span>
                                        </a>
                                    </li>
                                    <li><Logout /></li>
                                    {/* <img className="w-10 h-10 rounded-full" src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${auth.user?.avatar}`} alt="" /> */}

                                    <li className="flex items-center">
                                        <div className="avater-img bg-orange-600 text-white">
                                            <span className="">{firstLetter}</span>
                                        </div>
                                        <Link to="/profile"><span className="text-white ml-2">{`${auth.user?.firstName} ${auth.user?.lastName}`}s</span></Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login" className="text-white/50 hover:text-white transition-all duration-200">
                                        Login
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;