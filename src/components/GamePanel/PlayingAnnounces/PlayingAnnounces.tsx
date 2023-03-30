import type { FC } from "react";
import type { Answer, Language, NotePlayed } from "business";
import ProgressBar from "./RoundProgressBar/ProgressBar";
import UserAnswers from "./UserAnswers/UserAnswers";

interface Props {
  round: number
  answers: Answer[]
  announceNotePlayed: NotePlayed
  intervalTime: number
  displayProgressBar: boolean
  language: Language
}

const PlayingAnnounces: FC<Props> = ({
  round,
  answers,
  announceNotePlayed,
  intervalTime,
  displayProgressBar,
  language
}) => (
    <>
      {displayProgressBar && <ProgressBar
        round={round}
        intervalTime={intervalTime}
      />}
      <UserAnswers
        answers={answers}
        note={announceNotePlayed}
        language={language}
      />
    </>
);

export default PlayingAnnounces;
