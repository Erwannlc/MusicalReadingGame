import { type FC } from "react";
import type { Messages } from "business";

interface Props {
  scorePercent: number
  openModal: () => void
  onQuitGame: () => void
  messages: Messages
}

const FeedbackScore: FC<Props> = ({
  scorePercent,
  openModal,
  onQuitGame,
  messages
}) => {
  const {
    FEEDBACK_YOU_HAVE,
    FEEDBACK_GOOD_ANSWERS,
    FEEDBACK_CONGRATS,
    FEEDBACK_UPGRADE_OPTIONS,
    FEEDBACK_DOWNGRADE_OPTIONS,
    FEEDBACK_DISPLAY_CORRECTION,
    QUIT_GAME
  } = messages;

  const SCORE_FEEDBACK =
    FEEDBACK_YOU_HAVE +
    scorePercent.toString() + "%" +
    FEEDBACK_GOOD_ANSWERS + ". ";

  return (
    <>
      {scorePercent > 80
        ? <>
          <p className="end-of-game center">
            {SCORE_FEEDBACK} {FEEDBACK_CONGRATS}
          </p>
          <p className="end-of-game">
            {FEEDBACK_UPGRADE_OPTIONS}
              <span
                style={{ fontSize: "140%", verticalAlign: "middle" }}>
                  &#x2699;&#xfe0e;
              </span>
            {`).`}
          </p>
        </>
        : <>
          <p className="end-of-game center">
           {SCORE_FEEDBACK}
          </p>
          <p className="end-of-game">
            {FEEDBACK_DOWNGRADE_OPTIONS}
          </p>
        </>
      }
      <button onClick={openModal} className="open-modal">
        {FEEDBACK_DISPLAY_CORRECTION}
      </button>
      <button onClick={onQuitGame} className="back-to-default">
        {QUIT_GAME}
      </button>
    </>
  );
};

export default FeedbackScore;
