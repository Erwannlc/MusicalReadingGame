import type { KeyboardLayout, Note } from "business";
import { keyboardKeyNotes, pianoScale } from "business/data/appData";

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

function getKeyfromNote (note: Note, kbLayout: KeyboardLayout): string {
  const keyData =
    keyboardKeyNotes.filter(keyData => keyData.noteId === note.getId());
  const isAzerty = kbLayout === "azerty";
  return isAzerty ? keyData[0].azerty : keyData[0].qwerty;
}

function getNotefromKey (key: string, kbLayout: KeyboardLayout): Note {
  const isAzerty = kbLayout === "azerty";
  const keyData = isAzerty
    ? keyboardKeyNotes.filter(keyData => keyData.azerty === key)
    : keyboardKeyNotes.filter(keyData => keyData.qwerty === key);
  const note = pianoScale.filter(note => note.getId() === keyData[0].noteId)[0];
  return note;
}

const azertyKeys = keyboardKeyNotes.map(note => note.azerty);
const qwertyKeys = keyboardKeyNotes.map(note => note.qwerty);

export {
  playNoteSound,
  getKeyfromNote,
  getNotefromKey,
  azertyKeys,
  qwertyKeys
};
