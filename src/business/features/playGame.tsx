import type {
  NotePlayed,
  GameOptions,
  Sheet,
  Answer,
  NaturalNoteName,
  AnnounceProps,
  CorrectionType,
  GameStatus,
  Messages,
  Language
} from "business";
import { Status } from "business";
import { createGameSheet, getEmptyAnswers } from "business/data";
import { Correction } from "components/GamePanel";
import { utils, helpers } from "shared";

const {
  getNaturalNoteLatinName,
  optionsGetters
} = utils;
const { wait } = helpers;

let countdownTimer: NodeJS.Timeout;
let countDownTime = 3;
let stopGameAnnounceTimer: NodeJS.Timeout;

function getPlayGameHandlers ({
  displayInfo,
  displayNotePlayed,
  setGameSheet,
  setGameStatus,
  getWelcomeAnnounce,
  gameSheet,
  gameLength,
  notePlayedRef,
  gameStatus,
  options,
  isMobile,
  messages,
  language
}: {
  displayInfo: (announce: AnnounceProps) => void
  displayNotePlayed: (note: NotePlayed) => void
  setGameSheet: (value: React.SetStateAction<Sheet>) => void
  setGameStatus: (value: React.SetStateAction<GameStatus>) => void
  getWelcomeAnnounce: (language: Language) => AnnounceProps
  gameSheet: Sheet
  gameLength: number
  notePlayedRef: React.MutableRefObject<NotePlayed>
  gameStatus: GameStatus
  options: GameOptions
  isMobile: boolean
  messages: Messages
  language: Language
}) {
  const { round, status } = gameStatus;
  const isReportingFeedback = status === Status.reportingFeedback;
  const isAutoPlay = options.playMode !== "manual";
  const interval = optionsGetters.getIntervalTime(options.tempo);
  const intervalTime = round > gameLength ? interval * 2 : interval;
  const {
    ANNOUNCE_ON_STOP_GAME_STOPPED,
    ANNOUNCE_ON_STOP_END_OF_GAME,
    ANNOUNCE_LETS_PLAY,
    ANNOUNCE_ARE_YOU_READY
  } = messages;

  function onPlayClick () {
    setGameStatus({ status: Status.initializing, round: 0 });
    initializeGame();
  }

  function onStopClick () {
    (async () => {
      clearTimeout(countdownTimer);
      clearTimeout(stopGameAnnounceTimer);
      setGameStatus({ status: Status.ending, round: 0 });
      const announce = isReportingFeedback
        ? ANNOUNCE_ON_STOP_END_OF_GAME
        : ANNOUNCE_ON_STOP_GAME_STOPPED;
      displayInfo({ content: announce });
      notePlayedRef.current = undefined;
      await wait(1000);
      onGameEnd();
    })();
  }

  function initializeGame () {
    notePlayedRef.current = undefined;
    (async () => {
      if (isAutoPlay) {
        countdown();
      } else {
        displayInfo({ content: ANNOUNCE_LETS_PLAY });
        stopGameAnnounceTimer = setTimeout(() => {
          setGameStatus({ status: Status.playing, round: 1 });
        }, 800);
      }
    })();
  }

  function saveAnswer (
    answerNote: NaturalNoteName | "?",
    currentRound: number
  ) {
    updateAnswers(answerNote, currentRound);
    if (round !== gameLength) {
      notePlayedRef.current = undefined;
    }
  }

  function quitRound () {
    setGameStatus(g => ({ ...g, round: round + 1 }));
    displayNotePlayed(notePlayedRef.current);
  }

  function onQuitGameRound (round: number) {
    if (round > 0) {
      (async () => {
        const answerNote = notePlayedRef.current?.naturalName ?? "?";
        const currentRound = round - 1;
        if (round === gameLength) {
          const answers = await updateAnswers(answerNote, currentRound);
          reportGameFeedback(answers);
          setGameStatus(() => ({
            status: Status.reportingFeedback,
            round: round + 1
          }));
        } else {
          saveAnswer(answerNote, currentRound);
          quitRound();
        };
      })();
    };
  }

  async function onGameEnd () {
    setGameStatus({ status: Status.ending, round: 0 });
    const sheet = await createGameSheet(
      options.clef,
      options.level,
      gameLength
    );
    setGameSheet(sheet);
    displayInfo(getWelcomeAnnounce(language));
    countDownTime = 3;
    displayNotePlayed(notePlayedRef.current);
  }

  function countdown () {
    if (countDownTime < 1) {
      clearTimeout(countdownTimer);
      setGameStatus({ status: Status.playing, round: 1 });
      return;
    }
    const countdownAnnounce = {
      content: `${String(ANNOUNCE_ARE_YOU_READY)} 
      ${countDownTime.toString()}`
    };
    displayInfo(countdownAnnounce);
    countDownTime--;
    const interval = intervalTime > 1000 ? 1000 : intervalTime;
    countdownTimer = setTimeout(countdown, interval);
  };

  async function updateAnswers (
    answerNote: NaturalNoteName | "?",
    currentRound: number
  ) {
    const newAnswer: Answer = {
      noteName: answerNote,
      isWrong: answerNote !== gameSheet.solution[currentRound][0]
    };
    const newAnswers: Answer[] = gameSheet.answers.map(
      (a, i) => i === currentRound ? newAnswer : a
    );
    setGameSheet(gameSheet => ({ ...gameSheet, answers: newAnswers }));
    return newAnswers;
  };

  function getScore (answers: Answer[]): number {
    const errors: number = answers
      .filter(answer => answer.isWrong === true).length;
    const score = gameLength - errors;
    return score;
  }

  function reportGameFeedback (answers: Answer[]) {
    const { solution } = gameSheet;
    const gameAnswers = [];
    const gameSolution = [];

    (async () => {
      for (let i = 0; i < gameLength; i++) {
        const solutionNote: NaturalNoteName = solution[i][0];
        setGameSheet(gameSheet => ({ ...gameSheet, score: getScore(answers) }));
        const answer = answers[i];
        const answerNoteName = answer.noteName ?? "?";
        const isWrong = !!answer.isWrong;
        const answerKey = `answer${i}`;
        const answerTxt = language === "fr"
          ? getNaturalNoteLatinName(answerNoteName)
          : answerNoteName;
        const solutionKey = `solution${i}`;
        const solutionNoteName = language === "fr"
          ? getNaturalNoteLatinName(solutionNote)
          : solutionNote;
        gameAnswers.push({
          key: answerKey,
          isWrong,
          content: answerTxt
        });
        gameSolution.push({
          key: solutionKey,
          isWrong,
          content: solutionNoteName
        });
      };
      const correctionProps: CorrectionType = {
        gameAnswers,
        gameSolution,
        messages
      };
      const announceCorrection: AnnounceProps = {
        className: "feedback correction",
        content: <Correction {...correctionProps}/>,
        isModal: isMobile,
        modal: {
          content: <Correction {...correctionProps}/>,
          className: "feedback correction"
        }
      };
      displayInfo(announceCorrection);
    })();
  }

  return {
    onPlayClick,
    onStopClick,
    getEmptyAnswers,
    onQuitGameRound,
    saveAnswer,
    quitRound
  };
}

export default getPlayGameHandlers;
