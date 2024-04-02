import Footer from "./Footer";
import BlogContents from "./BlogContents";
import PopularSidebar from "./PopularSidebar";
import FavouriteSidebar from "./FavouriteSidebar";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
    const { auth } = useAuth();
    
    return (
        <>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    <BlogContents />

                    {/* sidebar */}
                    <div className="md:col-span-2 h-full w-full space-y-5">
                        <PopularSidebar />
                        {
                            auth?.authToken && <FavouriteSidebar />
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </>

    );
};

export default Home;