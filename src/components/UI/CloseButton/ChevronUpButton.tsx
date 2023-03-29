import { type FC } from "react";
import "./chevron-up-button.scss";

interface Props {
  handleClose: () => void
  className?: string
  tooltip?: string
};

const ChevronUpButton: FC<Props> = ({ handleClose, className, tooltip }) => (
    <button
      onContextMenu={(event) => { event.preventDefault(); }}
      className={className ? className + " chevron-up" : "chevron-up"}
      onClick={handleClose}
      title={tooltip ?? "Close"}>
    </button>
);
export default ChevronUpButton;
