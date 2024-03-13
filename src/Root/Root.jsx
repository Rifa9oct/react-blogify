import { Outlet } from "react-router-dom";
import Header from "../pages/Home/Header";
import ProfileProvider from "../provider/ProfileProvider";

const Root = () => {
    return (
        <div>
            <ProfileProvider>
                <Header></Header>
                <Outlet></Outlet>
            </ProfileProvider>
        </div>
    );
};

export default Root;