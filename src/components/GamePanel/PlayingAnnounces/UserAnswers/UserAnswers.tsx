import { useRef, type FC } from "react";
import type { NotePlayed, Answer, Language } from "business";
import { utils } from "shared";
import "./user-answers.scss";

const {
  getNaturalNoteLatinName,
  getNoteLatinName
} = utils;

interface Props {
  answers: Answer[]
  note: NotePlayed
  language: Language
}

const AnnounceNotePlayed: FC<{ notePlayed: string, id: string }> = (
  { notePlayed, id }) => (
  <p className={`note-played`} key={id}>{notePlayed}</p>
);

const UserAnswers: FC<Props> = ({ answers, note, language }) => {
  const count = useRef(1); // allow NotePlayed to animate itself at each render
  count.current++;

  function getPlayedNoteName () {
    if (note) {
      if (language === "fr") {
        return getNoteLatinName(note);
      } else return note.naturalName;
    } else return "?";
  }

  function getAnswerNoteName (answer: Answer): string {
    if (answer.noteName) {
      if (language === "fr") {
        return getNaturalNoteLatinName(answer.noteName);
      } else return answer.noteName;
    } else return "";
  }

  const notePlayed = getPlayedNoteName();

  return (
  <div className="announce-answers">
    <div className="announce-last-answers">
        <table className="last-answers" aria-label="User's answers">
          <tbody>
            <tr className="notes">
              {answers.map((answer, i) =>
                <td
                  className="note"
                  key={`${answer.noteName ?? "?"}${i}`}>
                    {getAnswerNoteName(answer)}
                </td>
              )}
            </tr>
          </tbody>
        </table>
    </div>
    <AnnounceNotePlayed notePlayed={notePlayed} id={count.current.toString()}/>
  </div>
  );
};

export default UserAnswers;
