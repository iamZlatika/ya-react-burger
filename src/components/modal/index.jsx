import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleClose = (e) => {
      e.keyCode === 27 && onClose();
    };
    window.addEventListener("keydown", handleClose);
    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  }, [onClose]);

  return (
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
      document.getElementById("modal-root")
    )
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
