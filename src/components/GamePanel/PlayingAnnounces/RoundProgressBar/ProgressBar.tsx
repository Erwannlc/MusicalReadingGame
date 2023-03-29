import { type FC } from "react";
import type {
  CSSPropertiesWithVars
} from "shared/types/CSSPropertiesWithVars";
import "./progressbar.scss";

const ProgressBar: FC<{
  intervalTime: number
  round: number
}> = ({ intervalTime, round }) => {
  const styling: CSSPropertiesWithVars = {
    "--tempo-time": `${intervalTime / 1000}s`
  };
  return (
    <div className="play-progressbar" key={round.toString()}>
      <span className="progress" style={styling}></span>
    </div>
  );
};

export default ProgressBar;
