import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const Profile = () => {
    const { api } = useAxios();
    const { auth } = useAuth();

    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    
    //id = ${auth?.user?.id}
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/3d2dde4b6548275fb066`);
                
                setUser(response?.data?.firstName);
                setBlogs(response?.data?.blogs);
            } catch (error) {
                console.error(error); 
            }
        }
        fetchProfile();
    }, [api, auth?.user?.id]);

    return (
        <div>
            <h1>{user}</h1>
            <h1>blog length {blogs.length}</h1>
        </div>
    );
};

export default Profile;