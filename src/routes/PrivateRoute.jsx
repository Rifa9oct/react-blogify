import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { auth } = useAuth();
    if (auth.user) {
        return children;
    }

    return <Navigate to="/login"/>
}

export default PrivateRoute;