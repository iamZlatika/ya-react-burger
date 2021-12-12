import styles from "./modal-overlay.module.css";
import { ReactNode } from "react";

interface IModal {
  children: ReactNode,
  onClose: (e?: React.KeyboardEvent | React.MouseEvent<HTMLElement>) => void,
}

const ModalOverlay: React.FC<IModal> = ({ children, onClose }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  const onOverlayClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
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

export default ModalOverlay;
