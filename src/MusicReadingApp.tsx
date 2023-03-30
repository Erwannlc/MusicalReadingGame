import { type FC, useState, useRef, useEffect } from "react";
import type {
  GameOptions,
  AnnounceProps,
  GameStatus,
  NotePlayed,
  Language,
  KeyboardLayout
} from "business";
import {
  createGameSheet,
  features,
  defaultOptions,
  defaultGameSheet,
  defaultStatus,
  defaultLanguage,
  Device,
  Status
} from "business";
import {
  OptionsPanel,
  GamePanel,
  VFBox,
  VFBoxMobile,
  PianoDevice
} from "components";
import { useMediaQuery, utils } from "shared";
import "scss/app.scss";

const {
  getAnnounceHandler,
  getOptionsHandlers,
  getPlayPianoHandlers,
  getPlayGameHandlers
} = features;

const { getMobileMediaQuery, getMessages, getWelcomeAnnounce } = utils;

const MusicReadingApp: FC = () => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [kbLayout, setKbLayout] = useState<KeyboardLayout>("azerty");
  const [messages, setMessages] = useState(getMessages(language));
  const [device, setDevice] = useState<Device>(Device.Pads);
  const [options, setOptions] = useState<GameOptions>(defaultOptions);
  const [gameSheet, setGameSheet] = useState(defaultGameSheet);
  const [announceNotePlayed, setAnnounceNotePlayed] = useState<NotePlayed>();
  const [gameStatus, setGameStatus] = useState<GameStatus>(defaultStatus);
  const [showOptions, setShowOptions] = useState(false);
  const [gameAnnounce, setGameAnnounce] = useState<AnnounceProps>(
    getWelcomeAnnounce(language)
  );
  const notePlayedRef = useRef<NotePlayed>();
  const roundRef = useRef<number>(0);
  const [isMobile] = useMediaQuery(getMobileMediaQuery());

  useEffect(() => {
    const messages = getMessages(language);
    setMessages(messages);
    setGameAnnounce(getWelcomeAnnounce(language));
  }, [language]);

  const gameLength = 12;

  const displayPianodevice: boolean =
    gameStatus.status !== Status.reportingFeedback;

  const {
    displayInfo,
    displayNotePlayed
  } = getAnnounceHandler({
    setGameAnnounce,
    setAnnounceNotePlayed
  });

  const {
    onPlayClick,
    onStopClick,
    onQuitGameRound,
    saveAnswer,
    quitRound
  } = getPlayGameHandlers({
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
  });

  const {
    onClefChange,
    onLevelChange,
    onTempoChange,
    onDeviceSwitch,
    onPlayModeChange,
    onToggleOptions,
    onLanguageChange
  } = getOptionsHandlers({
    setOptions,
    setDevice,
    createGameSheet,
    setGameSheet,
    setShowOptions,
    setLanguage,
    options,
    gameLength
  });

  const {
    onNotePlayed
  } = getPlayPianoHandlers({
    displayNotePlayed,
    onQuitGameRound,
    saveAnswer,
    notePlayedRef,
    roundRef,
    gameStatus,
    playMode: options.playMode
  });

  const optionsProps = {
    onClefChange,
    onLevelChange,
    onTempoChange,
    onDeviceSwitch,
    onPlayModeChange,
    onToggleOptions,
    onLanguageChange,
    options,
    device,
    gameStatus,
    showOptions,
    language,
    messages
  };

  const pianoProps = {
    onNotePlayed,
    device,
    isMobile,
    language,
    kbLayout
  };

  const vexFlowProps = {
    gameSheet,
    clef: options.clef,
    level: options.level,
    gameLength,
    gameStatus,
    isMobile
  };

  const gamePanelProps = {
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
    answers: gameSheet.answers,
    score: gameSheet.score,
    notePlayedRef,
    roundRef,
    language,
    announceNotePlayed,
    showOptions,
    isMobile,
    messages
  };

  return (
    <main className="app">
      <GamePanel {...gamePanelProps} />
      <OptionsPanel {...optionsProps} />
      {isMobile ? <VFBoxMobile {...vexFlowProps}/> : <VFBox {...vexFlowProps}/>}
      {displayPianodevice && <PianoDevice {...pianoProps}/>}
    </main>
  );
};

export default MusicReadingApp;
