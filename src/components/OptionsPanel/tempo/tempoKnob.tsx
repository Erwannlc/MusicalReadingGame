import { type FC, useState } from "react";
import { Knob } from "components/UI";
import "./tempo-knob.scss";

interface Props {
  onTempoChange: (newTempo: number) => void
  tempo: number
  disabled: boolean
};

const TempoKnob: FC<Props> = ({
  onTempoChange,
  tempo
}) => {
  const [value, setValue] = useState(tempo);

  const forceCurrentDegrees = tempo === 1 ? 95 : false;

  const numTicks = 10;
  const max = 11;
  const degrees = 180;
  const hslBaseColor = 210;

  const onChange = (newValue: number) => {
    setValue(newValue);
  };

  const onKnobRelease = (newvalue: number) => {
    onTempoChange(newvalue);
  };

  return (
    <div key="tempoKnob" className="knob-dial">
      <Knob
        size={50}
        numTicks={numTicks}
        degrees={degrees}
        min={1}
        max={max}
        value={value}
        color={true}
        onChange={onChange}
        hslBaseColor={hslBaseColor}
        forceCurrentDegrees = {forceCurrentDegrees}
        onKnobRelease={onKnobRelease}
      />
    </div>
  );
};

export default TempoKnob;
