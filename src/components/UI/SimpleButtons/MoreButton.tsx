import { type FC } from "react";
import "./more-button.scss";

interface Props {
  onMoreOpen: () => void
  className?: string
  tooltip?: string
};

const MoreButton: FC<Props> = ({ onMoreOpen, className, tooltip }) => (
    <button
      onContextMenu={(event) => { event.preventDefault(); }}
      className={className ? className + " more-button" : "more-button"}
      onClick={onMoreOpen}
      title={tooltip ?? "Open more options"}>
      <span className="more-icon"/>
    </button>
);
export default MoreButton;
