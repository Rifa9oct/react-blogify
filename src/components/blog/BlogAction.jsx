import dots from "../../assets/icons/3dots.svg";
import edit from "../../assets/icons/edit.svg";
import del from "../../assets/icons/delete.svg";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { useLocation } from "react-router-dom";
import Portal from "../../utils/Portal";
import EditBlog from "./EditBlog";

const BlogAction = ({ blogId, refetch, setFilter, filter, updateBlog, setUpdateBlog, filterBlogs }) => {
    const [showAction, setShowAction] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { api } = useAxios();
    const location = useLocation();

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    const handleclick = () => {
        setShowModal(true);
        setShowAction(false);
    }

    const handleDelete = async () => {
        try {
            const response = await api.delete(`/blogs/${blogId}`)
            if (response.status === 200) {
                toast.success('Delete successfully !🙂', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setShowAction(false)
                if (location.pathname === "/") {
                    setFilter({
                        ...filter,
                        state: true,
                        blogId: blogId
                    })
                } else {
                    refetch();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

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
                        <button onClick={handleclick}
                            className="action-menu-item hover:text-lwsGreen"
                        >
                            <img
                                src={edit}
                                alt="Edit"
                            />
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
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

            {
                showModal && (
                    <Portal>
                        <EditBlog onClose={() => setShowModal(false)}
                            blogId={blogId}
                            refetch={refetch}
                            setShowModal={setShowModal}
                            updateBlog={updateBlog}
                            setUpdateBlog={setUpdateBlog}
                            filterBlogs={filterBlogs}
                        />
                    </Portal>
                )
            }
        </div>
    );
};

export default BlogAction;