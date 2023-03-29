import {
  Status
} from "business";
import type {
  NaturalNoteName,
  NotePlayed,
  GameStatus,
  Note,
  PlayMode
} from "business";
import { helpers } from "shared";
const { wait } = helpers;

export default function getPlayPianoHandlers ({
  displayNotePlayed,
  onQuitGameRound,
  saveAnswer,
  notePlayedRef,
  roundRef,
  gameStatus,
  playMode
}: {
  displayNotePlayed: (note: NotePlayed) => void
  onQuitGameRound: (round: number) => void
  saveAnswer: (answerNote: NaturalNoteName | "?", currentRound: number) => void
  notePlayedRef: React.MutableRefObject<Note | undefined>
  roundRef: React.MutableRefObject<number>
  gameStatus: GameStatus
  playMode: PlayMode
}) {
  async function onNotePlayed (note: Note) {
    const { status, round } = gameStatus;
    const isPlaying = status === Status.playing;
    const isReportingFeedback = status === Status.reportingFeedback;
    const isInitializing = status === Status.initializing;
    notePlayedRef.current = note;

    if (!isReportingFeedback && !isInitializing) {
      switch (playMode) {
        case "auto2" : {
          displayNotePlayed(note);
          if (isPlaying && round > 0) {
            await wait(600);
            onQuitGameRound(round);
          };
          break;
        }
        case "auto3" : {
          if (isPlaying && round > 0) {
            if (roundRef.current < round) {
              displayNotePlayed(note);
              saveAnswer(note.naturalName, roundRef.current);
              roundRef.current += 1;
              await wait(1000);
              return;
            } else if (roundRef.current === round) {
              return;
            };
          } else {
            displayNotePlayed(note);
          }
          break;
        }
        case "auto1" :
        case "manual" :
        default :
          displayNotePlayed(note);
      };
    };
  }
  return {
    onNotePlayed
  };
};
