import type {
  Clef,
  GameOptions,
  Language,
  Levels,
  PlayMode,
  Sheet
} from "business";
import { Device } from "business";

export default function getOptionsHandlers ({
  setOptions,
  setDevice,
  createGameSheet,
  setGameSheet,
  setShowOptions,
  setLanguage,
  options,
  gameLength
}: {
  setOptions: (value: React.SetStateAction<GameOptions>) => void
  setDevice: (value: React.SetStateAction<Device>) => void
  createGameSheet: (
    clef: Clef,
    level: Levels,
    gameLength: number
  ) => Promise<Sheet>
  setGameSheet: (value: React.SetStateAction<Sheet>) => void
  setShowOptions: (value: React.SetStateAction<boolean>) => void
  setLanguage: (value: React.SetStateAction<Language>) => void
  options: GameOptions
  gameLength: number
}) {
  function onDeviceSwitch (stringDevice: "pads" | "piano"): void {
    const device: Device = stringDevice === "pads" ? Device.Pads : Device.Piano;
    setDevice(device);
    // setDisplayOptions(false);
  }

  function onTempoChange (newTempo: number): void {
    setOptions(options => ({ ...options, tempo: newTempo }));
  }

  function onLevelChange (newLevel: number): void {
    (async () => {
      setOptions(options => ({ ...options, level: newLevel }));
      const sheet = await createGameSheet(options.clef, newLevel, gameLength);
      setGameSheet(sheet);
    })();
  }

  function onClefChange (newClef: Clef): void {
    (async () => {
      setOptions(options => ({ ...options, clef: newClef }));
      const sheet = await createGameSheet(newClef, options.level, gameLength);
      setGameSheet(sheet);
    })();
  }

  function onPlayModeChange (newPlayMode: PlayMode): void {
    setOptions(options => ({ ...options, playMode: newPlayMode }));
  }

  function onToggleOptions (): void {
    setShowOptions(bool => !bool);
  }

  function onLanguageChange (language: Language): void {
    setLanguage(language);
  }

  return {
    onClefChange,
    onLevelChange,
    onTempoChange,
    onDeviceSwitch,
    onPlayModeChange,
    onToggleOptions,
    onLanguageChange
  };
}
