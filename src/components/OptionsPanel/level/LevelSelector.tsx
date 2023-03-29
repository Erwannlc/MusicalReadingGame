import { type FC } from "react";
import type { Messages, Levels } from "business";
import LevelKnob from "./LevelKnob";

interface Props {
  onLevelChange: (newLevel: number) => void
  level: Levels
  disabled: boolean
  messages: Messages
};

const LevelSelector: FC<Props> = (props) => {
  const {
    OPTIONS_TOOLTIP_LEVEL,
    OPTIONS_LEVEL_TITLE
  } = props.messages;
  const levelTooltip = OPTIONS_TOOLTIP_LEVEL;

  return (
  <div className="level-option" title={levelTooltip}>
    <p>{OPTIONS_LEVEL_TITLE}</p>
    <LevelKnob {...props}/>
  </div>
  );
};

export default LevelSelector;
