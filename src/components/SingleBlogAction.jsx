import heart from "../assets/icons/heart.svg";
import comment from "../assets/icons/comment.svg";
import like from "../assets/icons/like.svg";

const SingleBlogAction = ({ singleBlog, refetch }) => {
    // console.log(singleBlog);

    return (
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li>
                    <img src={like} alt="like" />
                    <span>10</span>
                </li>

                <li>
                    {/* There is heart-filled.svg in the icons folder */}
                    <img src={heart} alt="Favourite" />
                </li>
                <a href="#comments">
                    <li>
                        <img src={comment} alt="Comments" />
                        <span>3</span>
                    </li>
                </a>
            </ul>
        </div>
    );
};

export default SingleBlogAction;