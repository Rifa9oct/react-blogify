import { useAuth } from "../hooks/useAuth"
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { auth } = useAuth();
    if (auth?.authToken) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"/>;
}

export default PrivateRoute;