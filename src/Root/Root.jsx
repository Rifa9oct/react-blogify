import { Outlet } from "react-router-dom";
import Header from "../pages/Home/Header";
import ProfileProvider from "../provider/ProfileProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
    return (
        <div>
            <ProfileProvider>
                <Header></Header>
                <Outlet></Outlet>
                <ToastContainer />
            </ProfileProvider>
        </div>
    );
};

export default Root;