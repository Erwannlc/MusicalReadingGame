import { type FC, useState } from "react";
import { Levels } from "business";
import { Knob } from "components/UI";
import "./level-knob.scss";

interface Props {
  onLevelChange: (newLevel: number) => void
  level: Levels
};

const LevelKnob: FC<Props> = ({
  onLevelChange,
  level
}) => {
  const [value, setValue] = useState(level + 1);

  const max = Levels.level7 + 1;
  const numTicks = max - 1;
  const degrees = 140;
  const hslBaseColor = 37;

  const onChange = (newValue: number) => {
    setValue(newValue);
  };

  const onKnobRelease = (newValue: number) => {
    onLevelChange(newValue - 1);
  };

  return (
    <div key="levelKnob" className="knob-dial">
      <Knob
        size={50}
        numTicks={numTicks}
        degrees={degrees}
        min={1}
        max={max}
        value={value}
        color={true}
        hslBaseColor={hslBaseColor}
        onChange={onChange}
        forceCurrentDegrees = {false}
        onKnobRelease={onKnobRelease}
      />
    </div>
  );
};

export default LevelKnob;
