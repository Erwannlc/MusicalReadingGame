import { type FC } from "react";
import type { CorrectionType } from "business";
import "./correction.scss";

const Correction: FC <CorrectionType> = ({
  gameAnswers,
  gameSolution,
  messages
}) => {
  function getClassName (isWrong: boolean) {
    return isWrong ? "wrong" : "correct";
  }
  const {
    CORRECTION_MYANSWERS,
    CORRECTION_SOLUTION
  } = messages;

  return (
    <table className="correction" aria-label="Answers and solution">
      <tbody>
        <tr className="title">
          <th colSpan={gameSolution.length}>{CORRECTION_MYANSWERS}</th>
        </tr>
        <tr className="answers notes">
          {gameAnswers.map(answer =>
            <td
             className={getClassName(answer.isWrong)}
             key={answer.key}>{answer.content}</td>
          )}
        </tr>
        <tr className="title">
          <th colSpan={gameSolution.length}>{CORRECTION_SOLUTION}</th>
        </tr>
        <tr className="solution notes">
          {gameSolution.map(solution =>
            <td
            className={getClassName(solution.isWrong)}
            key={solution.key}>{solution.content}</td>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default Correction;
