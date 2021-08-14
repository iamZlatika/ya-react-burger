import { useEffect } from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener("keydown", onClose);
    return () => {
      window.removeEventListener("keydown", onClose);
    };
  }, [onClose]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  const onOverlayClose = (e) => {
    if (e.target == e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <div
      className={styles.open}
      onClick={(e) => onOverlayClose(e)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ModalOverlay;
