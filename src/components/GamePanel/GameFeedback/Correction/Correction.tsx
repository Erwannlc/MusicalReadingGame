import { type FC } from "react";
import type { CorrectionType } from "business";
import "./correction.scss";

const Correction: FC <CorrectionType> = ({
  gameAnswers,
  gameSolution,
  messages
}) => {
  function getClassName (isWrong: boolean) {
    return isWrong ? "note wrong" : "note correct";
  }
  const {
    CORRECTION_MYANSWERS,
    CORRECTION_SOLUTION
  } = messages;

  return (
    <div className="correction" aria-label="Answers and solution">
      <div className="correction-answers">
        <h1>{CORRECTION_MYANSWERS}</h1>
        <div className="answers notes">
          {gameAnswers.map(answer =>
            <div
              className={getClassName(answer.isWrong)}
              key={answer.key}>{answer.content}</div>
          )}
        </div>
      </div>
      <div className="correction-solution">
        <h1>{CORRECTION_SOLUTION}</h1>
        <div className="solution notes">
          {gameSolution.map(solution =>
            <div
            className={getClassName(solution.isWrong)}
            key={solution.key}>{solution.content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Correction;
