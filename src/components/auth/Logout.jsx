import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
    const {setAuth} = useAuth()
    const navigatev = useNavigate();
    const handleLogout = () => {
        setAuth({});
        navigatev("/login")
    }

    return (
        <>
            <button onClick={handleLogout} to="/login" className="text-white/50 hover:text-white transition-all duration-200">
                LogOut
            </button>
        </>
    );
};

export default Logout;