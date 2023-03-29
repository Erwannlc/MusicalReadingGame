import { type FunctionComponent } from "react";
import type {
  Device,
  PlayMode,
  Clef,
  GameOptions,
  GameStatus,
  Language,
  Messages
} from "business";
import { Status } from "business";
import {
  ClefSelector,
  DeviceSwitch,
  LevelSelector,
  PlayModeSelector,
  TempoSelector,
  MoreOptionsModal
} from "components/OptionsPanel";
import "./options-panel.scss";
import ChevronUpButton from "components/UI/Buttons/ChevronUpButton";

interface Props {
  onClefChange: (newClef: Clef) => void
  onLevelChange: (newLevel: number) => void
  onTempoChange: (newTempo: number) => void
  onDeviceSwitch: (stringDevice: "pads" | "piano") => void
  onPlayModeChange: (playMode: PlayMode) => void
  onToggleOptions: () => void
  onLanguageChange: (language: Language) => void
  options: GameOptions
  device: Device
  gameStatus: GameStatus
  showOptions: boolean
  language: Language
  messages: Messages
};

const OptionsPanel: FunctionComponent <Props> = ({
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
}) => {
  const isPlaying = gameStatus.status === Status.playing;
  const isInitializing = gameStatus.status === Status.initializing;
  const isReportingFeedback = gameStatus.status === Status.reportingFeedback;
  const isDisabled = isInitializing || isPlaying || isReportingFeedback;
  const isTempoDisabled = isDisabled || options.playMode === "manual";
  const displayOptions = showOptions && !isDisabled;
  const className = `options panel ${displayOptions ? "animate fade" : ""}`;

  return (
    <div className={className}>
      <MoreOptionsModal
        className="more-options"
        onLanguageChange={onLanguageChange}
        language={language}
        messages={messages}
        />
      <PlayModeSelector
        playMode={options.playMode}
        onChange={onPlayModeChange}
        disabled={isDisabled}
        messages={messages}
      />
      <ChevronUpButton handleClose={onToggleOptions}/>
      <div className="tempo-level--knobs">
        <TempoSelector
          tempo={options.tempo}
          onTempoChange={onTempoChange}
          disabled={isTempoDisabled}
          messages={messages}
          />
        <LevelSelector
          level={options.level}
          onLevelChange={onLevelChange}
          disabled={isDisabled}
          messages={messages}
          />
      </div>
      <ClefSelector
        clef={options.clef}
        onChange={onClefChange}
        disabled={isDisabled}
        messages={messages}
      />
      <DeviceSwitch
        device={device}
        onChange={onDeviceSwitch}
        disabled={isDisabled}
        messages={messages}
       />

    </div>
  );
};

export default OptionsPanel;
