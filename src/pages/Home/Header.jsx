import logo from "./../../assets/logo.svg"
import search from "./../../assets/icons/search.svg"
import { Link } from "react-router-dom";
import Logout from "../../components/auth/Logout";

const Header = () => {
    return (
        <nav className="container">
            <div>
                <Link to="/">
                    <img className="w-32" src={logo} alt="logo" />
                </Link>
            </div>
            <div>
                <ul className="flex items-center space-x-5">
                    <li>
                        <a href="./createBlog.html"
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                            Write
                        </a>
                    </li>
                    
                    {/* search */}
                    {/* <li>
                        <a href="./search.html" className="flex items-center gap-2 cursor-pointer">
                            <img src={search} alt="Search" />
                            <span>Search</span>
                        </a>
                    </li> */}

                    <li>
                        <Link to="/login" className="text-white/50 hover:text-white transition-all duration-200">
                            Login
                        </Link>
                    </li>
                    <li><Logout/></li>

                    {/* profile  */}
                    {/* <li className="flex items-center">
                        <div className="avater-img bg-orange-600 text-white">
                            <span className="">S</span>
                        </div>
                        <a href="./profile.html"><span className="text-white ml-2">Saad Hasan</span></a>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Header;