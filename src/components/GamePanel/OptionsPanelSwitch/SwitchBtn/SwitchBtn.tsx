import { type FC } from "react";
import { GearIcon as Icon } from "./ui/settings-icon";

interface Props {
  onClick: () => void
  className: string
  tooltip: string
};

const SwitchBtn: FC<Props> = ({
  onClick,
  className,
  tooltip
}) => (
      <button
      className={className}
      type="button"
      onClick={onClick}
      title={tooltip}>
        <Icon />
      </button>
);

export default SwitchBtn;
