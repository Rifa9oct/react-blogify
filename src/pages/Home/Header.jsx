import logo from "./../../assets/logo.svg"
import search from "./../../assets/icons/search.svg"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logout from "../../components/auth/Logout";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { useEffect, useState } from "react";
import SearchModal from "../../components/SearchModal";
import Portal from "../../utils/Portal";

const Header = () => {
    const { auth } = useAuth();
    const { state } = useProfile();
    const user = state?.user ?? auth?.user;
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const avatarSrc = user?.avatar ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${user?.avatar}` : null;
    const firstLetter = user?.firstName?.slice(0, 1);

    const handleclick = () => {
        if (location.pathname !== "/") {
            navigate("/")
        }
        setShowModal(true)
    }

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

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
                                        <button onClick={handleclick} className="flex items-center gap-2 cursor-pointer">
                                            <img src={search} alt="Search" />
                                            <span>Search</span>
                                        </button>
                                    </li>
                                    <li><Logout /></li>

                                    <li className="flex items-center">
                                        {
                                            avatarSrc ? (
                                                <img className="w-10 h-10 rounded-full"
                                                    src={avatarSrc} alt="avatar" />
                                            ) : (
                                                <div className="avater-img bg-orange-600 text-white">
                                                    <span className="">{firstLetter}</span>
                                                </div>
                                            )
                                        }

                                        <Link to={`/profile/${user?.id}`}><span className="text-white ml-2">{user?.firstName} {user?.lastName}</span></Link>
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

            {
                showModal && (
                    <Portal>
                        <SearchModal onClose={() => setShowModal(false)} />
                    </Portal>
                )
            }
        </header >
    );
};

export default Header;