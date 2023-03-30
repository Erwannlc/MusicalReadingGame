// global
const AND = "et";
const ON = "sur";
const FROM = "de";
const TO = "à";
const ANDAHALF = "et demi";
// appData
const WELCOME = "Bienvenue !";

// features
// // playGame
const ANNOUNCE_ON_STOP_GAME_STOPPED = "Partie stoppée";
const ANNOUNCE_ON_STOP_END_OF_GAME = "Fin de partie";
const ANNOUNCE_LETS_PLAY = "Let's play !";
const ANNOUNCE_ARE_YOU_READY = "Are you ready ?";

// GamePanel
const PLAY_TOOLTIP = "Lancer une nouvelle partie";
const PLAY_TOOLTIP_FEEDBACK = "Quitter la partie en appuyant sur stop" +
      " pour pouvoir relancer une nouvelle partie";
const STOP_TOOLTIP = "Stopper la partie en cours";
const STOP_TOOLTIP_DISABLED =
  "Appuyez sur le bouton Play pour lancer une partie";
// // OptionsStatus Bar
const OPTIONSSTATUS_DIFFICULTY = "Difficulté";
const OPTIONSSTATUS_TEMPO_VERYSLOW = "très lent";
const OPTIONSSTATUS_TEMPO_SLOW = "lent";
const OPTIONSSTATUS_TEMPO_MODERATE = "modéré";
const OPTIONSSTATUS_TEMPO_FAST = "rapide";
const OPTIONSSTATUS_TEMPO_VERYFAST = "très rapide";
const OPTIONSSTATUS_TOOLTIP_GLOBAL = "Ouvrir le panneau Options";
const OPTIONSSTATUS_TOOLTIP_TEMPO = "secondes entre chaque note";
const OPTIONSSTATUS_TOOLTIP_LEVEL = "Niveau de difficulté :";
// // OptionsPanelSwitch
const OPTIONSPANELSWITCH_TOOLTIP_ISOPEN = "Fermer le panneau des options";
const OPTIONSPANELSWITCH_TOOLTIP_ISCLOSE = "Ouvrir le panneau des options";
// // NextRoundButton
const NEXTROUND_BUTTON = "Note suivante";
// // FeedBack Score
const FEEDBACK_YOU_HAVE = "Vous avez ";
const FEEDBACK_GOOD_ANSWERS = " de bonnes réponses";
const FEEDBACK_CONGRATS = "Bravo !";
const FEEDBACK_UPGRADE_OPTIONS =
  "Continuez à progresser en augmentant " +
  "la difficulté (accélérez le tempo" +
  "ou passer au niveau suivant dans les options";
const FEEDBACK_DOWNGRADE_OPTIONS =
  "Essayez d'atteindre un score d'au moins 80 % !" +
  "Réduisez le tempo ou le niveau si besoin.";
const FEEDBACK_DISPLAY_CORRECTION = "Cliquez ici pour afficher la correction";
const QUIT_GAME = "Quitter la partie";
// // Correction
const CORRECTION_MYANSWERS = "Mes réponses";
const CORRECTION_SOLUTION = "Solution";

// Options
const OPTIONS_TEMPO_TITLE = "Tempo";
const OPTIONS_TOOLTIP_TEMPO =
  "Augmenter le tempo en tournant le bouton vers la droite." +
  "\n Plus le tempo est élevé, moins il y a de temps " +
  "entre l'affichage de deux notes.";
const OPTIONS_TOOLTIP_CLEF_TREBLE = "Clef de sol uniquement";
const OPTIONS_TOOLTIP_CLEF_BASS = "Clef de fa uniquement";
const OPTIONS_TOOLTIP_CLEF_BOTH = "Clef de sol & clef de fa";
const OPTIONS_TOOLTIP_DEVICES_ISPIANO = "Quitter le mode Piano";
const OPTIONS_TOOLTIP_DEVICES_ISPADS = "Mode Piano";
// // LevelSelector
const OPTIONS_TOOLTIP_LEVEL =
"Augmenter la difficulté en tournant le bouton vers la droite. " +
"Quand la difficulté augmente," +
"les notes peuvent se trouver dans un intervalle d'octaves plus grand.";
const OPTIONS_LEVEL_TITLE = "Niveau";
// // Play Mode Selector
const OPTIONS_PLAYMODE_MANUAL = "Manuel";
const OPTIONS_PLAYMODE_MANUAL_TOOLTLIP =
 "Appuyez sur le bouton \"Note suivante\" pour valider votre réponse" +
 " quand vous le souhaitez.";
const OPTIONS_PLAYMODE_AUTO1 = "Auto 1";
const OPTIONS_PLAYMODE_AUTO1_TOOLTIP =
  "La réponse est enregistrée automatiquement à la fin du tour.";
const OPTIONS_PLAYMODE_AUTO2 = "Auto 2";
const OPTIONS_PLAYMODE_AUTO2_TOOLTIP =
  "Votre réponse est enregistrée dès qu'une note est jouée." +
  "\n Vous pouvez donc aller plus vite que le temps imparti " +
  "pour répondre à chaque note affichée";
const OPTIONS_PLAYMODE_AUTO3 = "Auto 3";
const OPTIONS_PLAYMODE_AUTO3_TOOLTIP =
  "Votre réponse est enregistrée dès qu'une note est jouée" +
  " (comme le mode \"Auto 2\")." +
  "\n Mais dans ce mode, la limite de temps est globale :" +
  "\n Vous pouvez laisser plusieurs notes s'afficher avant de répondre." +
  "\n Ce mode est très utile quand le tempo est rapide.";
// // More Options
const MORE_OPTIONS_TITLE = "Options";
const SELECT_LANGUAGE_LABEL = "Langue";
const SELECT_LANGUAGE_TOOLTIP = "Sélectionner la langue de l'interface";
const SELECT_KBLAYOUT_LABEL = "Azerty / Qwerty";
const SELECT_KBLAYOUT_TOOLTIP = "Sélectionner le type de clavier";

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
