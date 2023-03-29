import { type FC } from "react";
import "./game-score.scss";

interface Props {
  rawScore: number
  gamelength: number
}

const GameScoreCircle: FC<Props> = ({ rawScore, gamelength }) => (
    <div className="game-score" style={{ color: "whitesmoke" }}>
    Score = {rawScore} / {gamelength}
    </div>
);

export default GameScoreCircle;
