import type { KeyboardLayout, Language, Note } from "business";
import { keyboardKeyNotes, pianoScale } from "business/data/appData";
import { getNoteLatinName } from "shared/utils";

function playNoteSound (
  audioContext: AudioContext,
  freq: number
) {
  const osc = audioContext.createOscillator();
  const noteGainNode = audioContext.createGain();
  noteGainNode.connect(audioContext.destination);

  const zeroGain = 0.00001;
  const maxGain = 0.5;
  const sustainedGain = 0.001;

  noteGainNode.gain.value = zeroGain;

  const setAttack = () =>
    noteGainNode.gain.exponentialRampToValueAtTime(
      maxGain,
      audioContext.currentTime + 0.01
    );
  const setDecay = () =>
    noteGainNode.gain.exponentialRampToValueAtTime(
      sustainedGain,
      audioContext.currentTime + 1
    );
  const setRelease = () =>
    noteGainNode.gain.exponentialRampToValueAtTime(
      zeroGain,
      audioContext.currentTime + 2
    );

  setAttack();
  setDecay();
  setRelease();

  osc.connect(noteGainNode);
  osc.type = "triangle";

  if (Number.isFinite(freq)) {
    osc.frequency.value = freq;
  };
  osc.start();
  return osc;
}

const azertyKeys = keyboardKeyNotes.map(note => note.azerty);
const qwertyKeys = keyboardKeyNotes.map(note => note.qwerty);
interface KeyNote {
  noteId: string
  key: string
};

function getPianoNotePrint (
  isMobile: boolean,
  keysNotes: KeyNote[],
  language: Language
) {
  function getNotePrint (note: Note) {
    const noteNamePrint = language === "fr"
      ? getNoteLatinName(note)
      : note.naturalName;
    const keyNotePrint = getKeyfromNote(note, keysNotes);
    return isMobile ? noteNamePrint : keyNotePrint;
  }
  return getNotePrint;
};

function getKeys (kbLayout: KeyboardLayout): string[] {
  return kbLayout === "azerty"
    ? azertyKeys
    : qwertyKeys;
}

function getKeysNotes (keys: string[]): KeyNote[] {
  return keyboardKeyNotes.map((note, i) => ({
    noteId: note.noteId,
    key: keys[i]
  }));
}

function getKeyfromNote (note: Note, keysNotes: KeyNote[]): string {
  const keyData = keysNotes.filter(keyData => keyData.noteId === note.getId());
  return keyData[0].key;
}

function getNotefromKeys (keysNotes: KeyNote[]) {
  function getNotefromKey (key: string) {
    const keyData = keysNotes.filter(keyData => keyData.key === key);
    const note = pianoScale.filter(note => note.getId() === keyData[0].noteId)[0];
    return note;
  }
  return getNotefromKey;
}

export {
  playNoteSound,
  getKeyfromNote,
  getNotefromKeys,
  getPianoNotePrint,
  getKeys,
  getKeysNotes
};

export type {
  KeyNote
};
