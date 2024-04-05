import { AuthContext } from "../context";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useLocalStorage("user", {})
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;