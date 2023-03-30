import {
  chromaticScale,
  Clef,
  Levels,
  Status
} from "./dataTypes";
import type {
  Sheet,
  GameOptions,
  Language,
  LevelScales,
  Note,
  GameStatus
} from "./dataTypes";
import {
  createGameSheet,
  createDataNotes,
  createLevelScale,
  createPianoScale
} from "./dataUtils";
const notes: Note[] = createDataNotes();

const keyboardKeyNotes = [
  { noteId: "C.4", azerty: "Q", qwerty: "A" },
  { noteId: "C#.4", azerty: "Z", qwerty: "W" },
  { noteId: "D.4", azerty: "S", qwerty: "S" },
  { noteId: "D#.4", azerty: "E", qwerty: "E" },
  { noteId: "E.4", azerty: "D", qwerty: "D" },
  { noteId: "F.4", azerty: "F", qwerty: "F" },
  { noteId: "F#.4", azerty: "T", qwerty: "T" },
  { noteId: "G.4", azerty: "G", qwerty: "G" },
  { noteId: "G#.4", azerty: "Y", qwerty: "Y" },
  { noteId: "A.4", azerty: "H", qwerty: "H" },
  { noteId: "A#.4", azerty: "U", qwerty: "U" },
  { noteId: "B.4", azerty: "J", qwerty: "J" },
  { noteId: "C.5", azerty: "K", qwerty: "K" },
  { noteId: "C#.5", azerty: "O", qwerty: "O" },
  { noteId: "D.5", azerty: "L", qwerty: "L" },
  { noteId: "D#.5", azerty: "P", qwerty: "P" },
  { noteId: "E.5", azerty: "M", qwerty: "semicolon" }
];

const pianoScale = createPianoScale("C.4", "F.5", false);
const mobilePianoScale = createPianoScale("C.4", "C.5", false);
const padsScale = createPianoScale("C.4", "C.5", true);

const levelData: LevelScales = {
  treble: {
    [Levels.level0]: createLevelScale("E.4", "B.4"),
    [Levels.level1]: createLevelScale("C.4", "D.5"),
    [Levels.level2]: createLevelScale("B.3", "A.5"),
    [Levels.level3]: createLevelScale("A.3", "C.6"),
    [Levels.level4]: createLevelScale("G.3", "A.6"),
    [Levels.level5]: createLevelScale("F.3", "C.7"),
    [Levels.level6]: createLevelScale("E.3", "A.7"),
    [Levels.level7]: createLevelScale("E.3")
  },
  bass: {
    [Levels.level0]: createLevelScale("C.3", "G.3"),
    [Levels.level1]: createLevelScale("F.2", "A.3"),
    [Levels.level2]: createLevelScale("E.2", "B.3"),
    [Levels.level3]: createLevelScale("C.2", "C.4"),
    [Levels.level4]: createLevelScale("B.1", "E.4"),
    [Levels.level5]: createLevelScale("G.1", "F.4"),
    [Levels.level6]: createLevelScale("C.1", "F.4"),
    [Levels.level7]: createLevelScale("A.0", "F.4")
  }
};

const tempoValues: string[] = getTempoArr();

function getTempoArr () {
  const tempoArr: string[] = [];
  for (let i = 1; i < 12; i++) {
    tempoArr.push(i.toString());
  }
  return tempoArr;
};

const levelNameValues = getLevelValues("string");
const levelNumericValues = getLevelValues("number");

function getLevelValues (type: "number" | "string") {
  switch (type) {
    case "number" : {
      return Object.values(Levels).filter(
        value => typeof value !== "string"
      );
    }
    case "string" : {
      return Object.values(Levels).filter(
        value => typeof value === "string"
      );
    }
  }
}

const defaultOptions: GameOptions = {
  tempo: 2,
  level: Levels.level4,
  clef: Clef.treble,
  playMode: "auto1"
};

let defaultGameSheet: Sheet;
(async () => {
  const defaultSheet = await createGameSheet(
    defaultOptions.clef,
    defaultOptions.level,
    12
  );
  defaultGameSheet = defaultSheet;
})();

const defaultStatus: GameStatus = {
  status: Status.ending,
  round: 0
};

const defaultLanguage: Language = "fr";

export {
  notes,
  defaultGameSheet,
  tempoValues,
  levelNameValues,
  levelNumericValues,
  defaultOptions,
  defaultStatus,
  defaultLanguage,
  levelData,
  chromaticScale,
  keyboardKeyNotes,
  pianoScale,
  mobilePianoScale,
  padsScale
};
