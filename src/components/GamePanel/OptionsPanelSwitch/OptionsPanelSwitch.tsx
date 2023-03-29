import { type FC } from "react";
import type { Messages } from "business";
import SwitchBtn from "./SwitchBtn/SwitchBtn";
import "./options-panel-switch.scss";

interface Props {
  onClick: () => void
  showOptions: boolean
  messages: Messages
}

const OptionsPanelSwitch: FC<Props> = ({ onClick, showOptions, messages }) => {
  const {
    OPTIONSPANELSWITCH_TOOLTIP_ISOPEN,
    OPTIONSPANELSWITCH_TOOLTIP_ISCLOSE
  } = messages;
  const optionsPanelSwitch = {
    className: showOptions ? "depth is-active" : "depth",
    tooltip: showOptions
      ? OPTIONSPANELSWITCH_TOOLTIP_ISOPEN
      : OPTIONSPANELSWITCH_TOOLTIP_ISCLOSE
  };
  return (
    <div className="options-switch">
      <SwitchBtn
        onClick={onClick}
        className={optionsPanelSwitch.className}
        tooltip={optionsPanelSwitch.tooltip}/>
    </div>
  );
};

export default OptionsPanelSwitch;
