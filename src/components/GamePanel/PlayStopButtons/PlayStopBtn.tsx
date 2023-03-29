import { type FC } from "react";
import PlayIcon from "./icons/play-icon";
import StopIcon from "./icons/stop-icon";
import "./play-stop.scss";

interface Props {
  onPlayClick: () => void
  onStopClick: () => void
  isDisabled: { isPlayDisabled: boolean, isStopDisabled: boolean }
  uiMessages: {
    playClassN: string
    stopClassN: string
    playTooltip: string
    stopTooltip: string
  }
}

const PlaySTopBtn: FC<Props> = ({
  onPlayClick,
  onStopClick,
  isDisabled,
  uiMessages
}) => (
    <div className="play-stop--buttons">
      <button
        className={uiMessages.playClassN}
        onClick={onPlayClick}
        disabled={isDisabled.isPlayDisabled}
        title={uiMessages.playTooltip}
        >  <PlayIcon /> </button>
      <button
        className={uiMessages.stopClassN}
        onClick={onStopClick}
        disabled={isDisabled.isStopDisabled}
        title={uiMessages.stopTooltip}
        >  <StopIcon /> </button>
    </div>
);

export default PlaySTopBtn;
