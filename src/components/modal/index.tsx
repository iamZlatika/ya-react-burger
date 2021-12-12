import { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModal {
  children: ReactNode,
  onClose: () => void,
}

const Modal: React.FC<IModal> = ({ children, onClose }) => {
  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
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
      document.getElementById("modal-root")!
    )
  );
};

export default Modal;
