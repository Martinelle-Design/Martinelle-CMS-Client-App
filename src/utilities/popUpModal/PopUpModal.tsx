import { createPortal } from "react-dom";
import ExitIcon from "../exitIcon/ExitIcon";
import { useEffect } from "react";
const PopUpModal = ({
  children,
  onClose,
}: {
  children: JSX.Element | string | JSX.Element[];
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []); 
  return createPortal(
    <div className="pop-up-modal">
      <button aria-label="close-pop-up" onClick={onClose}></button>
      <div className="pop-up-modal-inner">
        <button
          className="pop-up-modal-close-btn"
          aria-label="close-pop-up"
          onClick={onClose}
        >
          <ExitIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
export default PopUpModal;
