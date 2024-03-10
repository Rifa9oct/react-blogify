import { Outlet } from "react-router-dom";
import Header from "../pages/Home/Header";

const Root = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;