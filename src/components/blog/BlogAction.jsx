import dots from "../../assets/icons/3dots.svg";
import edit from "../../assets/icons/edit.svg";
import del from "../../assets/icons/delete.svg";
import { useState } from "react";

const BlogAction = ({blogId}) => {
    const [showAction, setShowAction] = useState(false);
    return (
        <div className="absolute right-0 top-0">
            <button onClick={() => setShowAction(!showAction)}>
                <img
                    src={dots}
                    alt="3dots of Action"
                />
            </button>
            
            {/* Action Menus Popup  */}
            {
                showAction && (
                    <div className="action-modal-container">
                        <button
                            className="action-menu-item hover:text-lwsGreen"
                        >
                            <img
                                src={edit}
                                alt="Edit"
                            />
                            Edit
                        </button>
                        <button
                            className="action-menu-item hover:text-red-500"
                        >
                            <img
                                src={del}
                                alt="Delete"
                            />
                            Delete
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default BlogAction;