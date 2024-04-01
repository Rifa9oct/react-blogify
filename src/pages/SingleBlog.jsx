import { useParams } from "react-router-dom";
import Footer from "./Home/Footer";

const SingleBlog = () => {
    const { id } = useParams();
    console.log(id)
    return (
        <div>
            <h1>single blog page...</h1>
            <Footer/>
        </div>
    );
};

export default SingleBlog;