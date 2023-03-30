// global
const AND = "and";
const ON = "on";
const FROM = "from";
const TO = "to";
const ANDAHALF = "and a half";
// appData
const WELCOME = "Welcome";

// features
// // playGame
const ANNOUNCE_ON_STOP_GAME_STOPPED = "Game stopped";
const ANNOUNCE_ON_STOP_END_OF_GAME = "End of the game";
const ANNOUNCE_LETS_PLAY = "Let's play !";
const ANNOUNCE_ARE_YOU_READY = "Are you ready ?";

// GamePanel
const PLAY_TOOLTIP = "Start a new game";
const PLAY_TOOLTIP_FEEDBACK = "Quit the game by pressing stop" +
      " to be able to start a new game";
const STOP_TOOLTIP = "Stop the game in progress";
const STOP_TOOLTIP_DISABLED =
  "Press Play button to start a new game";
// // OptionsStatus Bar
const OPTIONSSTATUS_DIFFICULTY = "Difficulty";
const OPTIONSSTATUS_TEMPO_VERYSLOW = "very slow";
const OPTIONSSTATUS_TEMPO_SLOW = "slow";
const OPTIONSSTATUS_TEMPO_MODERATE = "moderate";
const OPTIONSSTATUS_TEMPO_FAST = "fast";
const OPTIONSSTATUS_TEMPO_VERYFAST = "very fast";
const OPTIONSSTATUS_TOOLTIP_GLOBAL = "Open Options Panel";
const OPTIONSSTATUS_TOOLTIP_TEMPO = "seconds between each note";
const OPTIONSSTATUS_TOOLTIP_LEVEL = "Difficulty level:";
// // OptionsPanelSwitch
const OPTIONSPANELSWITCH_TOOLTIP_ISOPEN = "Close Options Panel";
const OPTIONSPANELSWITCH_TOOLTIP_ISCLOSE = "Open Options Panel";
// // NextRoundButton
const NEXTROUND_BUTTON = "Next Round";
// // FeedBack Score
const FEEDBACK_YOU_HAVE = "You get ";
const FEEDBACK_GOOD_ANSWERS = " correct";
const FEEDBACK_CONGRATS = "Well done!";
const FEEDBACK_UPGRADE_OPTIONS =
  "Keep progressing by increasing " +
  "the difficulty (accelerate the tempo " +
  "or go to the next level in the options ";
const FEEDBACK_DOWNGRADE_OPTIONS =
  "Try to achieve a score of at least 80%! " +
  "\n Downgrade the tempo or level if needed.";
const FEEDBACK_DISPLAY_CORRECTION = "Click here to view correction";
const QUIT_GAME = "Quit Game";
// // Correction
const CORRECTION_MYANSWERS = "My answers :";
const CORRECTION_SOLUTION = "Solution :";

// Options
const OPTIONS_TEMPO_TITLE = "Tempo";
const OPTIONS_TOOLTIP_TEMPO =
  "Increase the tempo by turning the knob to the right." +
  "\n The higher the tempo, the less beat " +
  "between the display of two notes.";
const OPTIONS_TOOLTIP_CLEF_TREBLE = "Treble Clef Only";
const OPTIONS_TOOLTIP_CLEF_BASS = "Bass Clef Only";
const OPTIONS_TOOLTIP_CLEF_BOTH = "Both Treble & Bass Clef";
const OPTIONS_TOOLTIP_DEVICES_ISPIANO = "Quit Piano Mode";
const OPTIONS_TOOLTIP_DEVICES_ISPADS = "Piano Mode";
// // LevelSelector
const OPTIONS_TOOLTIP_LEVEL =
"Increase the difficulty by turning the knob to the right. " +
"When the difficulty increases," +
"notes can be in a larger octave range.";
const OPTIONS_LEVEL_TITLE = "Level";
// // Play Mode Selector
const OPTIONS_PLAYMODE_MANUAL = "Manual";
const OPTIONS_PLAYMODE_MANUAL_TOOLTLIP =
 "Press the 'next round' button to validate your answer" +
 " whenever you want.";
const OPTIONS_PLAYMODE_AUTO1 = "Auto 1";
const OPTIONS_PLAYMODE_AUTO1_TOOLTIP =
  "Answer is saved automatically when round ends.";
const OPTIONS_PLAYMODE_AUTO2 = "Auto 2";
const OPTIONS_PLAYMODE_AUTO2_TOOLTIP =
  "Your answer is saved as soon as a note is played." +
   "\n So you can go faster than the time limit " +
   "to respond to each displayed note";
const OPTIONS_PLAYMODE_AUTO3 = "Auto 3";
const OPTIONS_PLAYMODE_AUTO3_TOOLTIP =
"Your answer is saved as soon as a note is played (like Auto2 Mode)." +
  "\n But in this mode, the time limit is global:" +
  "\n You may leave several notes displayed before responding." +
  "\n This mode is very useful when the tempo is fast.";
// // More Options
const MORE_OPTIONS_TITLE = "Options";
const SELECT_LANGUAGE_LABEL = "Language";
const SELECT_LANGUAGE_TOOLTIP = "Select the language interface";
const SELECT_KBLAYOUT_LABEL = "Azerty / Qwerty";
const SELECT_KBLAYOUT_TOOLTIP = "Select the keyboard layout";
export {
  AND,
  ON,
  FROM,
  TO,
  ANDAHALF,
  WELCOME,
  ANNOUNCE_ON_STOP_GAME_STOPPED,
  ANNOUNCE_ON_STOP_END_OF_GAME,
  ANNOUNCE_LETS_PLAY,
  ANNOUNCE_ARE_YOU_READY,
  PLAY_TOOLTIP,
  PLAY_TOOLTIP_FEEDBACK,
  STOP_TOOLTIP,
  STOP_TOOLTIP_DISABLED,
  OPTIONSSTATUS_DIFFICULTY,
  OPTIONSSTATUS_TEMPO_VERYSLOW,
  OPTIONSSTATUS_TEMPO_SLOW,
  OPTIONSSTATUS_TEMPO_MODERATE,
  OPTIONSSTATUS_TEMPO_FAST,
  OPTIONSSTATUS_TEMPO_VERYFAST,
  OPTIONSSTATUS_TOOLTIP_GLOBAL,
  OPTIONSSTATUS_TOOLTIP_TEMPO,
  OPTIONSSTATUS_TOOLTIP_LEVEL,
  OPTIONSPANELSWITCH_TOOLTIP_ISOPEN,
  OPTIONSPANELSWITCH_TOOLTIP_ISCLOSE,
  NEXTROUND_BUTTON,
  FEEDBACK_YOU_HAVE,
  FEEDBACK_GOOD_ANSWERS,
  FEEDBACK_CONGRATS,
  FEEDBACK_UPGRADE_OPTIONS,
  FEEDBACK_DOWNGRADE_OPTIONS,
  FEEDBACK_DISPLAY_CORRECTION,
  QUIT_GAME,
  CORRECTION_MYANSWERS,
  CORRECTION_SOLUTION,
  OPTIONS_TEMPO_TITLE,
  OPTIONS_TOOLTIP_TEMPO,
  OPTIONS_TOOLTIP_CLEF_TREBLE,
  OPTIONS_TOOLTIP_CLEF_BASS,
  OPTIONS_TOOLTIP_CLEF_BOTH,
  OPTIONS_TOOLTIP_DEVICES_ISPIANO,
  OPTIONS_TOOLTIP_DEVICES_ISPADS,
  OPTIONS_TOOLTIP_LEVEL,
  OPTIONS_LEVEL_TITLE,
  OPTIONS_PLAYMODE_MANUAL,
  OPTIONS_PLAYMODE_MANUAL_TOOLTLIP,
  OPTIONS_PLAYMODE_AUTO1,
  OPTIONS_PLAYMODE_AUTO1_TOOLTIP,
  OPTIONS_PLAYMODE_AUTO2,
  OPTIONS_PLAYMODE_AUTO2_TOOLTIP,
  OPTIONS_PLAYMODE_AUTO3,
  OPTIONS_PLAYMODE_AUTO3_TOOLTIP,
  MORE_OPTIONS_TITLE,
  SELECT_LANGUAGE_LABEL,
  SELECT_LANGUAGE_TOOLTIP,
  SELECT_KBLAYOUT_LABEL,
  SELECT_KBLAYOUT_TOOLTIP
};
