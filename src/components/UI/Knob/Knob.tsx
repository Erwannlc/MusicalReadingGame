import React, { type FC, useState, useRef } from "react";
import { getKnobUtils } from "./knobUtils";

interface KnobProps {
  size: number
  numTicks: number
  degrees: number
  min: number
  max: number
  value: number
  color: boolean
  hslBaseColor: number
  onChange: (newValue: number) => void
  forceCurrentDegrees: false | number
  onKnobRelease: (newValue: number) => void
}

const Knob: FC<KnobProps> = (props) => {
  const {
    size,
    numTicks,
    degrees,
    min,
    value,
    max,
    color,
    hslBaseColor,
    onChange,
    forceCurrentDegrees,
    onKnobRelease
  } = props;

  const fullAngle = degrees;
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const margin = size * 0.15;
  const {
    convertRange,
    getDeg,
    renderTicks
  } = getKnobUtils(
    size,
    numTicks,
    startAngle,
    endAngle,
    fullAngle,
    margin
  );

  let currentDeg: number = forceCurrentDegrees ||
    Math.floor(convertRange(min, max, startAngle, endAngle, value));

  const [deg, setDeg] = useState(currentDeg);

  const newValue = useRef<number>(value);

  function moveHandler (
    clientX: number,
    clientY: number,
    pts: { x: number, y: number }
  ): void {
    currentDeg = getDeg(clientX, clientY, pts);
    if (currentDeg === startAngle) currentDeg--;

    let calcValue: number = Math.floor(
      convertRange(
        startAngle,
        endAngle,
        min,
        max,
        currentDeg
      )
    );
    if (calcValue === 0) calcValue = 1;
    if (calcValue !== value) onChange(calcValue);
    newValue.current = calcValue;
    setDeg(currentDeg);
  };

  const ptsRef = useRef<{
    x: number
    y: number
  }>({ x: 0, y: 0 });

  function touchGrapHandler (e: TouchEvent) {
    moveHandler(e.touches[0].clientX, e.touches[0].clientY, ptsRef.current);
  };
  function mouseGrapHandler (e: MouseEvent) {
    moveHandler(e.clientX, e.clientY, ptsRef.current);
  };
  function handleTouchEnd (e: TouchEvent) {
    e.preventDefault();
    e.stopPropagation();
    stopDrag();
  }

  function startDragTouch (e: React.TouchEvent) {
    const knob = e.currentTarget.getBoundingClientRect();
    ptsRef.current = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };
    document.addEventListener("touchmove", touchGrapHandler);
    document.addEventListener("touchend", handleTouchEnd);
  };
  function startDrag (e: React.MouseEvent) {
    e.preventDefault();
    const knob = e.currentTarget.getBoundingClientRect();
    ptsRef.current = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };
    document.addEventListener("mousemove", mouseGrapHandler);
    document.addEventListener("mouseup", stopDrag);
  };

  function stopDrag () {
    document.removeEventListener("touchmove", touchGrapHandler);
    document.removeEventListener("mousemove", mouseGrapHandler);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", handleTouchEnd);
    onKnobRelease(newValue.current);
  };

  interface KStyle {
    width: number
    height: number
  };

  const dcpy = (o: KStyle) => JSON.parse(JSON.stringify(o));

  const kStyle = {
    width: size,
    height: size
  };
  const iStyle = dcpy(kStyle);
  const oStyle = dcpy(kStyle);
  oStyle.margin = margin;
  if (color) {
    oStyle.backgroundImage =
    `radial-gradient(100% 70%,hsl(${hslBaseColor},
       ${currentDeg}%,
        ${currentDeg / 5}%),
        hsl(${Math.random() * 100},
        20%,${currentDeg / 36}%))`;
  };
  iStyle.transform = `rotate(${deg}deg)`;

  return (
    <div className="knob" style={kStyle}>
      <div className="ticks">
        {numTicks
          ? renderTicks().map((tick, i) => (
            <div
              key={i}
              className={
                // first tick (=== 0) always active
                "tick" + (
                  tick.deg <= currentDeg
                    ? " active"
                    : i === 0
                      ? " active"
                      : ""
                )
              }
              style={tick.tickStyle}
            />
          ))
          : null}
      </div>
      <div
        className="knob outer"
        style={oStyle}
        onMouseDown={startDrag}
        onTouchStart={startDragTouch}
        onContextMenu={(event) => { event.preventDefault(); }}
        >
          <div className="knob inner" style={iStyle}>
            <div className="grip" />
          </div>
      </div>
    </div>
  );
};

export default Knob;
