import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, onClose }) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };
  return (
    <div
      className={styles.open}
      onClick={onClose}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};
export default ModalOverlay;
