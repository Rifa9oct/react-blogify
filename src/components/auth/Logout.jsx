import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigatev = useNavigate();
    const handleLogout = () => {
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