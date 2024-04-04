import { createPortal } from "react-dom";
const Portal = ({ children }) => {
    const mountElement = document.getElementById('portal-root');

    return createPortal(children, mountElement);
}

export default Portal;