
import { Clef, type Messages, type GameOptions } from "business";

export default function getOptionsStatus (
  options: GameOptions,
  intervalTime: number,
  language: "fr" | "en",
  messages: Messages
) {
  const {
    AND,
    ON,
    ANDAHALF,
    OPTIONSSTATUS_DIFFICULTY,
    OPTIONSSTATUS_TEMPO_VERYSLOW,
    OPTIONSSTATUS_TEMPO_SLOW,
    OPTIONSSTATUS_TEMPO_MODERATE,
    OPTIONSSTATUS_TEMPO_FAST,
    OPTIONSSTATUS_TEMPO_VERYFAST,
    OPTIONSSTATUS_TOOLTIP_GLOBAL,
    OPTIONS_TOOLTIP_CLEF_TREBLE,
    OPTIONS_TOOLTIP_CLEF_BASS,
    OPTIONS_TOOLTIP_CLEF_BOTH,
    OPTIONSSTATUS_TOOLTIP_TEMPO,
    OPTIONSSTATUS_TOOLTIP_LEVEL
  } = messages;
  const { tempo, clef, level } = options;
  const levelValue = level + 1;
  function getAndAHalfMessage (noun: string): string {
    if (language === "fr") {
      return noun + " " + ANDAHALF;
    } else if (language === "en") {
      return ANDAHALF + " " + noun;
    } else return "";
  }

  const optionsStatus = {
    tempo: `Tempo : ${tempo.toString()} / 11 (${
          intervalTime >= 4000
            ? OPTIONSSTATUS_TEMPO_VERYSLOW
            : intervalTime >= 3000
              ? OPTIONSSTATUS_TEMPO_SLOW
              : intervalTime > 1600
                ? OPTIONSSTATUS_TEMPO_MODERATE
                : intervalTime > 1000
                  ? OPTIONSSTATUS_TEMPO_FAST
                  : OPTIONSSTATUS_TEMPO_VERYFAST
        })`,
    level:
      `${OPTIONSSTATUS_DIFFICULTY} : ${(levelValue).toString()} / 8`,
    levelTxt: `${
          levelValue === 6
            ? "5 octaves"
            : levelValue === 5
              ? "4 octaves"
              : levelValue === 4
                ? `3 ${getAndAHalfMessage("octaves")}`
                : `${levelValue} octaves`
        }`,
    clef: `Clef : ${clef === Clef.treble
        ? "𝄞"
        : clef === Clef.bass
        ? "𝄢"
        : `𝄞 ${AND} 𝄢`}`,
    clefName: `${clef === Clef.treble
        ? OPTIONS_TOOLTIP_CLEF_TREBLE
        : clef === Clef.bass
        ? OPTIONS_TOOLTIP_CLEF_BASS
        : OPTIONS_TOOLTIP_CLEF_BOTH}`
  };

  const optionsStatusUIMessages = {
    tooltips: {
      global: OPTIONSSTATUS_TOOLTIP_GLOBAL,
      tempo: `${intervalTime / 1000} ${OPTIONSSTATUS_TOOLTIP_TEMPO}`,
      clef:
      `${optionsStatus.clefName}`,
      level: `${OPTIONSSTATUS_TOOLTIP_LEVEL}
       ${levelValue} ${ON} 8 (${optionsStatus.levelTxt})`
    },
    indicator: optionsStatus
  };
  return optionsStatusUIMessages;
};
