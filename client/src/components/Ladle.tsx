import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

// Brew surface centre, in the cauldron's viewBox units.
const CX = 200;
const CY = 114;
// One full stir, in ms.
const PERIOD = 1700;

// Real stirring geometry: the tip circles inside the brew while the hand
// circles above it in the same phase, so the stick keeps a steady lean and
// sweeps around the pot instead of plunging in and out.
function pose(t: number) {
  const a = (t / PERIOD) * Math.PI * 2;
  const cos = Math.cos(a);
  const sin = Math.sin(a); // > 0 = front of the pot (closer to the viewer)
  const tip = { x: CX + 78 * cos, y: CY + 13 * sin };
  const top = { x: CX + 30 + 104 * cos, y: CY - 176 + 20 * sin };
  return { tip, top };
}

function Ladle() {
  const stickRef = useRef<SVGGElement>(null);
  const tipRef = useRef<SVGGElement>(null);
  const gripRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const { tip, top } = pose(reduce ? PERIOD * 0.15 : now - start);
      const angle = (Math.atan2(top.y - tip.y, top.x - tip.x) * 180) / Math.PI;

      stickRef.current?.querySelectorAll("line").forEach((line) => {
        line.setAttribute("x1", String(tip.x));
        line.setAttribute("y1", String(tip.y));
        line.setAttribute("x2", String(top.x));
        line.setAttribute("y2", String(top.y));
      });
      tipRef.current?.setAttribute("transform", `translate(${tip.x} ${tip.y})`);
      gripRef.current?.setAttribute(
        "transform",
        `translate(${top.x} ${top.y}) rotate(${angle + 90})`,
      );

      if (!reduce) frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <g>
      {/* stick: starts exactly at the waterline, so nothing pokes through */}
      <g ref={stickRef} strokeLinecap="round">
        <line stroke="#2A180C" strokeWidth="16" />
        <line stroke="#8A5530" strokeWidth="11" />
        <line stroke="#C4895A" strokeWidth="3" strokeOpacity=".7" />
      </g>

      {/* grip + knob at the hand end; local -y points along the stick */}
      <g ref={gripRef}>
        <rect x="-10" y="-30" width="20" height="26" rx="6" fill="#4FB83A" />
        <circle cx="0" cy="-36" r="9" fill="#FF9A3D" />
      </g>

      {/* where the stick meets the brew: slime collar, wake ripple, splashes */}
      <g ref={tipRef}>
        <ellipse cx="0" cy="0" rx="14" ry="4.5" fill="#7CE35A" />
        <ellipse cx="0" cy="-1" rx="7" ry="2" fill="#C6FFAE" fillOpacity=".85" />
        <ellipse
          className="cd-ripple"
          cx="0"
          cy="1"
          rx="26"
          ry="6"
          fill="none"
          stroke="#E7FFD9"
          strokeWidth="3"
        />
        <g fill="#C6FFAE">
          <circle className="cd-splash" r="4" style={{ "--dx": "-34px" } as CSSProperties} />
          <circle className="cd-splash s2" r="3" style={{ "--dx": "28px" } as CSSProperties} />
          <circle className="cd-splash s3" r="3.5" style={{ "--dx": "-14px" } as CSSProperties} />
          <circle className="cd-splash s4" r="2.5" style={{ "--dx": "40px" } as CSSProperties} />
        </g>
      </g>
    </g>
  );
}

export default Ladle;
