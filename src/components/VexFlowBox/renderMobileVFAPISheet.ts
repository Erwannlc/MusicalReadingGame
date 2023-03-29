import { Vex } from "vexflow";
import type {
  Levels,
  Note,
  SingleClef
} from "business";
import { getMobileStaveY, getVFNote } from "./vexFlowAPIUtils";
import { utils } from "shared";

const renderMobileVFSheet = (
  note: Note,
  clef: SingleClef,
  level: Levels,
  isPlaying: boolean
) => {
  const containerWidth = 140;
  const containerHeight = 180;
  const staveWidth = 90;
  const staveX = 25;
  const staveY = getMobileStaveY(level, clef);
  const clefName = utils.optionsGetters.getClefName(clef) as "treble" | "bass";

  const VFNote: string = getVFNote(note, true, "quarterNote", clef);

  document.documentElement.style.setProperty(
    "--vexflow_height", `${containerHeight}px`
  );
  document.documentElement.style.setProperty(
    "--notes-visibility", `${isPlaying ? "visible" : "hidden"}`
  );

  const VF = Vex.Flow;
  const vf = new VF.Factory({
    renderer: {
      elementId: "mobile-output",
      width: containerWidth,
      height: containerHeight
    }
  });
  const system = vf.System({ width: staveWidth, x: staveX, y: staveY });
  const score = vf.EasyScore();

  system.addStave({
    voices: [
      score.voice(score.notes(VFNote, { clef: clefName }),
        { time: "1/4" })
    ]
  }).addClef(clefName);

  vf.draw();
};

export default renderMobileVFSheet;
