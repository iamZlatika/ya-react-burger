import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({ children, isOpen, onClose }) => {
  const modalRoot = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(modalRoot);
    window.addEventListener("keydown", onClose);
    return () => {
      document.body.removeChild(modalRoot);
      window.removeEventListener("keydown", onClose);
    };
  }, [modalRoot, onClose]);

  return (
    isOpen &&
    ReactDOM.createPortal(
      <>
        <ModalOverlay onClose={onClose}>
          <div className={styles.modal}>
            <div className={`${styles.close} mr-10 mt-15`}>
              <CloseIcon type="primary" onClick={onClose} />
            </div>
            {children}
          </div>
        </ModalOverlay>
      </>,
      modalRoot
    )
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
export default Modal;
