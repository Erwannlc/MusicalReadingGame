import type { FC } from "react";
import type { Messages } from "business";
import { Clef } from "business";
import {
  type MetalButtonsUIData,
  MetalButtons
} from "components/UI";
import "./clefButtons.scss";

interface Props {
  onChange: (newClef: Clef) => void
  clef: Clef
  disabled: boolean
  messages: Messages
};

const ClefSelector: FC<Props> = ({ clef, onChange, disabled, messages }) => {
  const {
    OPTIONS_TOOLTIP_CLEF_TREBLE,
    OPTIONS_TOOLTIP_CLEF_BASS,
    OPTIONS_TOOLTIP_CLEF_BOTH
  } = messages;
  function handleChange (newValue: number | string) {
    const newClef = newValue as Clef;
    onChange(newClef);
  }

  const clefsButtonsUI: MetalButtonsUIData = {
    wrapper: {
      className: "clefs-buttons"
    },
    buttons: [{
      value: Clef.treble,
      label: "𝄞",
      labelClassName: clef === Clef.treble
        ? "is-active"
        : "",
      tooltip: OPTIONS_TOOLTIP_CLEF_TREBLE
    },
    {
      value: Clef.bass,
      label: "𝄢",
      labelClassName: clef === Clef.bass
        ? "is-active"
        : "",
      tooltip: OPTIONS_TOOLTIP_CLEF_BASS
    },
    {
      value: Clef.both,
      label: "𝄞 𝄢",
      labelClassName: clef === Clef.both
        ? "is-active"
        : "",
      tooltip: OPTIONS_TOOLTIP_CLEF_BOTH
    }]
  };

  return (
    <div className="clef-option">
    <p className="clef-option-title">Clef</p>
    <MetalButtons
        key="clef-selector-buttons"
        onChange={handleChange}
        ui={clefsButtonsUI}/>
  </div>
  );
};

export default ClefSelector;
