import { useEffect, useRef, type FC } from "react";
import {
  Status
} from "business";
import type {
  Answer,
  GameOptions,
  AnnounceProps,
  GameStatus,
  NotePlayed,
  Messages,
  Language
} from "business";
import {
  OptionsStatusBar,
  PlaySTopBtn,
  NextRoundButton,
  PlayingAnnounces,
  GameScore,
  FeedbackScore,
  FeedbackModal,
  OptionsPanelSwitch
} from "components/GamePanel";
import { utils } from "shared";
import "./game-panel.scss";

interface Props {
  onPlayClick: () => void
  onStopClick: () => void
  onQuitGameRound: (round: number) => void
  quitRound: () => void
  onToggleOptions: () => void
  displayInfo: (announce: AnnounceProps) => void
  gameAnnounce: AnnounceProps
  options: GameOptions
  gameStatus: GameStatus
  gameLength: number
  answers: Answer[]
  score: number
  notePlayedRef: React.MutableRefObject<NotePlayed>
  roundRef: React.MutableRefObject<number>
  language: "fr" | "en"
  announceNotePlayed: NotePlayed
  showOptions: boolean
  isMobile: boolean
  messages: Messages
}

const GamePanel: FC<Props> = ({
  onPlayClick,
  onStopClick,
  onQuitGameRound,
  quitRound,
  onToggleOptions,
  displayInfo,
  gameAnnounce,
  options,
  gameStatus,
  gameLength,
  answers,
  score,
  notePlayedRef,
  roundRef,
  language,
  announceNotePlayed,
  showOptions,
  isMobile,
  messages
}) => {
  const { status, round } = gameStatus;
  const isPlaying = status === Status.playing;
  const isInitializing = status === Status.initializing;
  const isReportingFeedback = status === Status.reportingFeedback;
  const isEnding = status === Status.ending;
  const isStopDisabled = isEnding;
  const isPlayDisabled = isReportingFeedback;
  const displayOptionsStatus = isEnding;
  const displayModal = !!gameAnnounce.isModal;
  const displayScore = (!isMobile && isReportingFeedback) || (
    isMobile && isReportingFeedback && displayModal
  );
  const isManualMode = options.playMode === "manual";
  const isAutoPlay1 = options.playMode === "auto1";
  const isAutoPlay2 = options.playMode === "auto2";
  const isAutoPlay3 = options.playMode === "auto3";

  const timer = useRef<NodeJS.Timeout>();
  const interval = utils.optionsGetters.getIntervalTime(options.tempo);
  const intervalTime = isAutoPlay3 && (round === gameLength)
    ? interval * 2
    : interval;
  function onQuitGame () {
    clearTimeout(timer.current);
    onStopClick();
  };

  useEffect(() => {
    if (!isManualMode && isPlaying && round > 0) {
      timer.current = setTimeout(() => {
        if (isAutoPlay1) onQuitGameRound(round);
        if (isAutoPlay2) {
          if (notePlayedRef.current === undefined) {
            onQuitGameRound(round);
          } else if (notePlayedRef !== undefined) {
            clearTimeout(timer.current);
          };
        };
        if (isAutoPlay3) {
          if (round === gameLength) {
            onQuitGameRound(round);
            roundRef.current = 0;
          } else {
            quitRound();
          }
        }
      }, intervalTime);
    };
    return () => {
      clearTimeout(timer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalTime, isPlaying, round]);

  const playingAnnounce = {
    round,
    gameLength,
    answers,
    announceNotePlayed,
    intervalTime,
    displayProgressBar: !isManualMode,
    language
  };
  const feedbackModal = {
    score,
    gameLength,
    displayModal,
    onStopClick,
    displayInfo
  };
  const {
    PLAY_TOOLTIP,
    PLAY_TOOLTIP_FEEDBACK,
    STOP_TOOLTIP
  } = messages;
  const playStopUIMessages = {
    playClassN: `play${isPlaying || isInitializing ? " is-play" : ""}`,
    stopClassN: "stop",
    playTooltip: isReportingFeedback
      ? PLAY_TOOLTIP_FEEDBACK
      : PLAY_TOOLTIP,
    stopTooltip: STOP_TOOLTIP,
    disabledPlayBtn: isReportingFeedback
  };

  return (
    <>
      <div className="game-panel">
        <div className="game-info shadow-node">
          <GameAnnounce
             announce={gameAnnounce}
             isPlaying={isPlaying}
             playingAnnounce={playingAnnounce}
             feedbackModal={feedbackModal}
             messages={messages}
          />
        </div>
        {displayOptionsStatus && <OptionsStatusBar
          options={options}
          language={language}
          onToggleOptions={onToggleOptions}
          messages={messages}
          />}
      </div>
      <div className="play-stop">
        <PlaySTopBtn
            onPlayClick={onPlayClick}
            onStopClick={onQuitGame}
            isDisabled={{ isPlayDisabled, isStopDisabled }}
            uiMessages={playStopUIMessages}
        />
      </div>
      <OptionsPanelSwitch
        onClick={onToggleOptions}
        showOptions={showOptions}
        messages={messages}
      />
      {displayScore &&
          <GameScore score={score} gameLength={gameLength}
      />}
      {isManualMode && isPlaying && round > 0 &&
        <NextRoundButton
          onNextRound={() => {
            onQuitGameRound(round);
          }}
          content={messages.NEXTROUND_BUTTON}
      />}
    </>
  );
};

export default GamePanel;

interface GameAnnounceProps {
  announce: AnnounceProps
  isPlaying: boolean
  playingAnnounce: {
    round: number
    gameLength: number
    answers: Answer[]
    announceNotePlayed: NotePlayed
    intervalTime: number
    displayProgressBar: boolean
    language: Language
  }
  feedbackModal: {
    score: number
    gameLength: number
    displayModal: boolean
    onStopClick: () => void
    displayInfo: (announce: AnnounceProps) => void
  }
  messages: Messages
}

const GameAnnounce: FC<GameAnnounceProps> = ({
  announce,
  isPlaying,
  playingAnnounce,
  feedbackModal,
  messages
}) => {
  const {
    score,
    gameLength,
    displayModal,
    onStopClick,
    displayInfo
  } = feedbackModal;

  function displayModalContent () {
    displayInfo({ ...announce, isModal: true });
  }

  function displayModalParentAnnounce (openModal: () => void) {
    const scorePercent: number = Math.round(score * 100 / gameLength);
    displayInfo(
      {
        content: <FeedbackScore
          scorePercent={scorePercent}
          openModal={openModal}
          onQuitGame={onStopClick}
          messages={messages}/>,
        className: "feedback",
        isModal: false
      });
  }

  if (isPlaying) {
    return <PlayingAnnounces {...playingAnnounce} />;
  } else {
    if (displayModal) {
      return (
        <FeedbackModal
          displayModalContent={displayModalContent}
          displayModalParentAnnounce={displayModalParentAnnounce}
          className="announce"
        >
          <Announce {...announce}/>
        </FeedbackModal>
      );
    }
    return (
      <Announce {...announce}/>
    );
  };
};

const Announce: FC<AnnounceProps> = (announce) => {
  const { content, className } = announce;
  function getAnnounceClassName (): string {
    if (className) {
      return className;
    } else return "default";
  };

  return (
    <div className={getAnnounceClassName()}>
      <>
      {content}
      </>
    </div>
  );
};
