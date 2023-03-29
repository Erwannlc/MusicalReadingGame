import type { FC } from "react";
import type { Messages } from "business";
import TempoKnob from "./tempoKnob";

interface Props {
  onTempoChange: (newTempo: number) => void
  tempo: number
  disabled: boolean
  messages: Messages
};

const TempoSelector: FC<Props> = (props) => {
  const {
    OPTIONS_TEMPO_TITLE,
    OPTIONS_TOOLTIP_TEMPO
  } = props.messages;
  const tempoTooltip = OPTIONS_TOOLTIP_TEMPO;

  return (
    <div className="tempo-option" title={tempoTooltip}>
      <p>{OPTIONS_TEMPO_TITLE}</p>
      <TempoKnob {...props} />
    </div>
  );
};

export default TempoSelector;
