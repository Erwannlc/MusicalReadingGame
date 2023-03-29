import { type FC } from "react";
import { data, Device, type Language, type Note } from "business";
import Piano from "./Piano";
import Pads from "./Pads";
import "./pads.scss";
import "./piano.scss";

const {
  pianoScale,
  padsScale,
  mobilePianoScale
} = data.appData;

interface Props {
  device: Device
  onNotePlayed: (note: Note) => void
  isMobile: boolean
  language: Language
}

const PianoDevice: FC<Props> = ({
  device,
  onNotePlayed,
  isMobile,
  language
}) => {
  const isPiano: boolean = device === Device.Piano;
  const isPads: boolean = device === Device.Pads;
  const scale = isMobile ? mobilePianoScale : pianoScale;

  return (
  <>
    <div className="piano-device">
      {isPiano &&
        <Piano
          pianoScale={scale}
          onNotePlayed={onNotePlayed}
        />}
      {isPads &&
        <Pads
          padsScale={padsScale}
          onNotePlayed={onNotePlayed}
          language={language}
        />}
    </div>
  </>
  );
};

export default PianoDevice;
