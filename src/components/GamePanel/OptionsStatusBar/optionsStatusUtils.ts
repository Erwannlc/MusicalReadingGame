
import type { Messages, GameOptions, NaturalNoteName } from "business";
import { Clef } from "business";
import type { Levels, LevelRange } from "business/data/dataTypes";
import { levelsRange, levelData } from "business/data/appData";
import { getNaturalNoteLatinName } from "shared/utils";

export default function getOptionsStatus (
  options: GameOptions,
  intervalTime: number,
  language: "fr" | "en",
  messages: Messages
) {
  const {
    AND,
    ANDAHALF,
    INTERVAL,
    OPTIONSSTATUS_LEVEL,
    OPTIONSSTATUS_CLEF,
    OPTIONSSTATUS_TEMPO,
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
  const levelValue = (level + 1).toString();

  function getAndAHalfMessage (noun: string): string {
    if (language === "fr") {
      return noun + " " + ANDAHALF;
    } else if (language === "en") {
      return ANDAHALF + " " + noun;
    } else return "";
  }

  function getNoteNameFromNoteId (noteId: string) {
    const note = noteId[0] as NaturalNoteName;
    if (language === "fr") {
      return getNaturalNoteLatinName(note).toUpperCase() + " " + noteId[2];
    } else return note + " " + noteId[2];
  };

  function getLevelsMessage () {
    function getClefLevelData (ranges: LevelRange[]) {
      return ranges.map(level => ({
        startNote: getNoteNameFromNoteId(level.startNoteId),
        endNote: getNoteNameFromNoteId(level.endNoteId ?? "C8")
      }));
    };
    const trebleData = getClefLevelData(levelsRange.treble);
    const bassData = getClefLevelData(levelsRange.bass);
    return {
      treble: trebleData,
      bass: bassData
    };
  }

  const levelsMessage = getLevelsMessage();

  function getRangeToOctaves (level: Levels): string {
    const notesNumber = levelData.treble[level].length;
    const OCTAVES = Math.round(notesNumber / 7) >= 2 ? "octaves" : "octave";
    if (notesNumber < 7) {
      return notesNumber.toString() + " notes";
    } else {
      const octavesNumber = Math.round((notesNumber / 7) * 2) / 2;
      if (Number.isInteger(octavesNumber)) {
        return octavesNumber.toString() + " " + OCTAVES;
      } else {
        return (Math.floor(octavesNumber)).toString() + " " +
        getAndAHalfMessage(OCTAVES);
      }
    }
  }

  function getNotesRange (level: number): string {
    function getNotesRangeMessage (range: {
      startNote: string
      endNote: string
    }) {
      return range.startNote + " --> " + range.endNote;
    }
    const trebleMsg = getNotesRangeMessage(levelsMessage.treble[level]);
    const bassMsg = getNotesRangeMessage(levelsMessage.bass[level]);
    switch (clef) {
      case (Clef.treble) : {
        return trebleMsg;
      }
      case (Clef.bass) : {
        return bassMsg;
      }
      case (Clef.both) : {
        return " 𝄞 : " + trebleMsg + "\n 𝄢 : " + bassMsg;
      }
    }
  }

  function getLevelInfo (level: Levels): string {
    function getIntervalMsg () {
      switch (clef) {
        case (Clef.treble):
        case (Clef.bass): return INTERVAL;
        case (Clef.both): return INTERVAL + "s";
      };
    };
    const intervalMsg = language === "fr"
      ? getIntervalMsg() + " de " + getRangeToOctaves(level)
      : getRangeToOctaves(level) + " " + getIntervalMsg();
    return intervalMsg + "\n" + getNotesRange(level);
  }

  function getTempoInfo (): string {
    switch (tempo) {
      case (1) :
      case (2) : return OPTIONSSTATUS_TEMPO_VERYSLOW;
      case (3) :
      case (4) : return OPTIONSSTATUS_TEMPO_SLOW;
      case (5) :
      case (6) :
      case (7) : return OPTIONSSTATUS_TEMPO_MODERATE;
      case (8) :
      case (9) : return OPTIONSSTATUS_TEMPO_FAST;
      case (10) :
      case (11) : return OPTIONSSTATUS_TEMPO_VERYFAST;
      default : return "";
    }
  }

  function getClefName (clef: Clef) {
    switch (clef) {
      case (Clef.treble): return {
        status: "𝄞",
        tooltip: OPTIONS_TOOLTIP_CLEF_TREBLE
      };
      case (Clef.bass): return {
        status: "𝄢",
        tooltip: OPTIONS_TOOLTIP_CLEF_BASS
      };
      case (Clef.both): return {
        status: `𝄞 ${AND} 𝄢`,
        tooltip: OPTIONS_TOOLTIP_CLEF_BOTH
      };
    }
  };

  const optionsStatus = {
    tempo: OPTIONSSTATUS_TEMPO +
      tempo.toString() + " / 11 (" + getTempoInfo() + ")",
    level: OPTIONSSTATUS_LEVEL + levelValue + " / 8",
    levelTxt: getLevelInfo(level),
    clef: OPTIONSSTATUS_CLEF + getClefName(clef).status,
    clefTooltip: getClefName(clef).tooltip
  };

  const optionsStatusUIMessages = {
    tooltip: {
      global: OPTIONSSTATUS_TOOLTIP_GLOBAL,
      tempo: `${intervalTime / 1000} ${OPTIONSSTATUS_TOOLTIP_TEMPO}`,
      clef:
      `${optionsStatus.clefTooltip}`,
      level: OPTIONSSTATUS_TOOLTIP_LEVEL + " " + levelValue +
       "\n\n" + optionsStatus.levelTxt
    },
    indicator: optionsStatus
  };
  return optionsStatusUIMessages;
};
