import { type FC } from "react";
import type { Messages, PlayMode } from "business";
import {
  type MetalButtonsUIData,
  MetalButtons
} from "components/UI";
import "./mode-buttons.scss";

interface Props {
  onChange: (playMode: PlayMode) => void
  playMode: PlayMode
  disabled: boolean
  messages: Messages
};

const PlayModeSelector: FC<Props> = ({
  playMode,
  onChange,
  disabled,
  messages
}) => {
  const {
    OPTIONS_PLAYMODE_MANUAL,
    OPTIONS_PLAYMODE_MANUAL_TOOLTLIP,
    OPTIONS_PLAYMODE_AUTO1,
    OPTIONS_PLAYMODE_AUTO1_TOOLTIP,
    OPTIONS_PLAYMODE_AUTO2,
    OPTIONS_PLAYMODE_AUTO2_TOOLTIP,
    OPTIONS_PLAYMODE_AUTO3,
    OPTIONS_PLAYMODE_AUTO3_TOOLTIP
  } = messages;

  function handleChange (newValue: number | string) {
    const newPlayMode = newValue as PlayMode;
    onChange(newPlayMode);
  }

  const clefsButtonsUI: MetalButtonsUIData = {
    wrapper: {
      className: "mode-buttons"
    },
    buttons: [
      {
        value: "manual",
        label: OPTIONS_PLAYMODE_MANUAL,
        labelClassName: playMode === "manual"
          ? "is-active"
          : "",
        tooltip: OPTIONS_PLAYMODE_MANUAL_TOOLTLIP
      },
      {
        value: "auto1",
        label: OPTIONS_PLAYMODE_AUTO1,
        labelClassName: playMode === "auto1"
          ? "is-active"
          : "",
        tooltip: OPTIONS_PLAYMODE_AUTO1_TOOLTIP
      },
      {
        value: "auto2",
        label: OPTIONS_PLAYMODE_AUTO2,
        labelClassName: playMode === "auto2"
          ? "is-active"
          : "",
        tooltip: OPTIONS_PLAYMODE_AUTO2_TOOLTIP
      },
      {
        value: "auto3",
        label: OPTIONS_PLAYMODE_AUTO3,
        labelClassName: playMode === "auto3"
          ? "is-active"
          : "",
        tooltip: OPTIONS_PLAYMODE_AUTO3_TOOLTIP
      }]
  };

  return (
    <div className="mode-option">
    {/* <p className="mode-option-title">Play Mode</p> */}
    <MetalButtons
        key="mode-selector-buttons"
        onChange={handleChange}
        ui={clefsButtonsUI}/>
  </div>
  );
};

export default PlayModeSelector;
