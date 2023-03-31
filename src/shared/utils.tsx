import type {
  AnnounceProps,
  Answer,
  SingleClef,
  NaturalNoteName,
  Note,
  Language
} from "business";
import { Clef } from "business";
import { FR, EN } from "messages";

function getNoteLatinName (note: Note) {
  const scaleA: Record<string, string> = {
    A: "la",
    B: "si",
    C: "do",
    D: "ré",
    E: "mi",
    F: "fa",
    G: "sol"
  };
  const latinNaturalNoteName = scaleA[note.naturalName];
  if (note.isSharp) {
    return `${latinNaturalNoteName}#`;
  } else return latinNaturalNoteName;
}
function getNaturalNoteLatinName (note: NaturalNoteName | "?") {
  const scaleA: Record<string, string> = {
    A: "la",
    B: "si",
    C: "do",
    D: "ré",
    E: "mi",
    F: "fa",
    G: "sol"
  };
  return note === "?" ? note : scaleA[note];
}

// Options getters
const optionsGetters = {
  getIntervalTime: (tempo: number) => {
    const interval: number =
    tempo > 0 && tempo < 5
      ? 500 * (5 - tempo) + 2500
      : tempo > 5
        ? 300 * (10 - tempo) + 1000
        : tempo === 5
          ? 2500
          : 5000;
    return interval;
  },
  getClefName: (clef: Clef): string => {
    switch (clef) {
      case Clef.treble : {
        return "treble";
      }
      case Clef.bass : {
        return "bass";
      }
      case Clef.both : {
        return "both";
      }
    }
  },
  getClefByClefName: (clef: string): Clef => {
    switch (clef) {
      case "treble" : {
        return Clef.treble;
      }
      case "bass" : {
        return Clef.bass;
      }
      case "both" : {
        return Clef.both;
      }
      default:
        return Clef.treble;
    }
  }
};

// Device getters
const deviceGetters = {
  getPianoNoteColor: (note: Note): string => {
    if (note.isSharp) {
      return "black";
    } else if (note.fullName === "C" || note.fullName === "F") {
      return "white";
    } else return "white offset";
  }
};

function displayNoteOnSheet (round: number, clef: Clef) {
  function displayTrebleNote () {
    document.getElementById(
        `vf-treble-n${round}`
    )?.classList.add("visible");
  };
  function displayBassNote () {
    document.getElementById(
        `vf-bass-n${round}`
    )?.classList.add("visible");
  };
  switch (clef) {
    case Clef.treble:
      displayTrebleNote();
      break;
    case Clef.bass:
      displayBassNote();
      break;
    case Clef.both:
      displayTrebleNote();
      displayBassNote();
      break;
  };
}

function highlightWrongNote (
  round: number,
  answers: Answer[],
  solution: Array<[NaturalNoteName, SingleClef]>
) {
  const index = round - 2;
  if (answers[index].isWrong) {
    const noteClef = solution[index][1] === Clef.treble
      ? "treble"
      : "bass";
    const partialId = `${noteClef}-n${index + 1}`;
    document.getElementById(`vf-${partialId}`)?.classList.add("wrongNote");
  }
}

function getMobileMediaQuery () {
  return `screen and (max-width: 850px) and (max-height: 1023px),
  screen and (max-height: 420px) and (orientation: landscape),
  screen and (max-width: 1024px) and (max-height: 600px)
  `;
  // screen and (max-width: 1024px) and (max-height: 600px)
  // and (orientation: landscape)`;
}

function getWelcomeAnnounce (language: Language): AnnounceProps {
  switch (language) {
    case ("en") : {
      return ({ content: EN.WELCOME });
    }
    case ("fr") : {
      return ({ content: FR.WELCOME });
    }
  }
}

function getMessages (language: Language) {
  switch (language) {
    case ("en") : {
      return EN;
    }
    case ("fr") : {
      return FR;
    }
  }
}

export {
  displayNoteOnSheet,
  highlightWrongNote,
  getNoteLatinName,
  getNaturalNoteLatinName,
  getMobileMediaQuery,
  getWelcomeAnnounce,
  getMessages,
  optionsGetters,
  deviceGetters
};
