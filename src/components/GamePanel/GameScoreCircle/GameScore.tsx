import { type FC } from "react";
import "./game-score.scss";
// Thx to Javier Delgado https://github.com/javiluli
// https://codepen.io/alvarotrigo/pen/VwMvydQ

interface Props {
  score: number
  gameLength: number
};

const getScoreColor = (score: number): string => {
  const colors = {
    A: "#55ff33",
    B: "#daff33",
    C: "#ffe433",
    D: "#ff7e33",
    E: "#ff3333"
  };
  return score > 80
    ? colors.A
    : score > 60
      ? colors.B
      : score > 40
        ? colors.C
        : score > 20
          ? colors.D
          : colors.E;
};

const GameScore: FC<Props> = ({
  score,
  gameLength
}) => {
  let scoreTxt = "Score";
  const className = {
    gameScore: "game-score hide",
    scoreCircle: "progressbar__svg-circle shadow-node",
    scoreTxt: "progressbar__text shadow-node"
  };

  if (score >= 0) {
    const scoreDashOffset = score === gameLength
      ? 0
      : 320 * +((gameLength - score) / gameLength).toFixed(1);
    document.documentElement.style.setProperty(
      "--score-dashoffset",
      scoreDashOffset.toString()
    );
    className.scoreCircle = "progressbar__svg-circle shadow-node circle-node";
    const scorePercent: string = (score * 100 / gameLength).toFixed(0);
    scoreTxt = `${scorePercent} %`;
    const scoreColor = getScoreColor(+scorePercent);
    document.documentElement.style.setProperty("--score-color", scoreColor);
    className.scoreTxt = "progressbar__text shadow-node display";
    className.gameScore = "game-score";
  };

  return (
    <div className={className.gameScore}>
      <div className="score-container">
        <div className="score-container__progressbars">
          <div className="progressbar">
            <svg className="progressbar__svg">
              <circle
                cx="55"
                cy="55"
                r="50"
                id="scoreCircle"
                className={className.scoreCircle}>
              </circle>
            </svg>
            <span className={className.scoreTxt}>{scoreTxt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScore;
