export function getKnobUtils (
  size: number,
  numTicks: number,
  startAngle: number,
  endAngle: number,
  fullAngle: number,
  margin: number
) {
  function convertRange (
    oldMin: number,
    oldMax: number,
    newMin: number,
    newMax: number,
    oldValue: number
  ): number {
    return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
  }

  function getDeg (cX: number, cY: number, pts: { x: number, y: number }) {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = Math.atan(y / x) * 180 / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    };
    const finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
    return finalDeg;
  };

  const renderTicks = () => {
    const ticks = [];
    const incr = fullAngle / numTicks;
    const newSize = margin + size / 2;
    for (let deg = startAngle; deg <= endAngle; deg += incr) {
      const tick = {
        deg,
        tickStyle: {
          height: newSize + 10,
          left: newSize - 1,
          top: newSize + 2,
          transform: `rotate(${deg}deg)`,
          transformOrigin: "top"
        }
      };
      ticks.push(tick);
    };
    return ticks;
  };
  return {
    convertRange,
    getDeg,
    renderTicks
  };
}
