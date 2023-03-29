import { type FC } from "react";
import "./close-button.scss";

interface Props {
  handleClose: () => void
  className?: string
  tooltip?: string
};

const CloseButton: FC<Props> = ({ handleClose, className, tooltip }) => (
    <button
      onContextMenu={(event) => { event.preventDefault(); }}
      className={className ? className + " close--button" : "close--button"}
      onClick={handleClose}
      title={tooltip ?? "Close"}>
      <span className={`close--button--line`}></span>
    </button>
);
export default CloseButton;
