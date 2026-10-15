import { useAppStore } from "../store/app.store";
import Cauldron from "./Cauldron";
import Graveyard from "./Graveyard";
import MagicSmoke from "./MagicSmoke";
import Pumpkin from "./Pumpkin";

const wispCls =
  "absolute bottom-0 animate-wisp rounded-full blur-[6px] transition-all duration-700";
const pumpkinCls =
  "absolute bottom-0 z-2 h-auto drop-shadow-[0_8px_20px_rgba(255,122,26,0.35)]";

const slotBase =
  "relative z-2 flex min-h-[140px] w-full max-w-[520px] flex-[0_1_auto] flex-col items-center justify-center gap-1.5 rounded-3xl p-5 text-center text-sm short:min-h-[110px]";
const slotFailed =
  "border-2 border-dashed border-red-500/55 bg-[radial-gradient(ellipse_at_50%_100%,rgba(239,68,68,0.16),rgba(13,9,19,0.5)_70%)] text-red-300";

function CauldronStage() {
  const { isAutomating, result, isFailed } = useAppStore();
  return (
    <section
      className="relative flex min-w-0 flex-none flex-col items-center justify-end overflow-x-clip px-4 pt-2 desk:min-h-0 desk:flex-[1_1_480px]"
      aria-label="Brew results"
      aria-busy={isAutomating}
    >
      {/*
        RESULT SLOT — sits right above the cauldron.
        success → MagicSmoke rises with the result (set via setResult in BrewForm)
        failed  → red message for 3s while the cauldron turns red
        idle    → placeholder
      */}
      <div
        id="brew-result"
        aria-live="polite"
        className={`${slotBase} ${result ? "" : isFailed ? slotFailed : ""}`}
      >
        {result ? (
          <MagicSmoke key={`${result.value}-${result.label}`} {...result} />
        ) : isFailed ? (
          <>
            <span className="font-mono text-[11px] tracking-[0.12em] text-red-400 uppercase">
              The brew went wrong
            </span>
            <p className="m-0">Check your ingredients and try again.</p>
          </>
        ) : null}
      </div>

      {/* vapor between pot and result — thicker and purple once a result rises */}
      <div className="relative h-10 w-50 flex-none" aria-hidden="true">
        {[
          "left-10",
          "left-[90px] [animation-delay:1.2s]",
          "left-[140px] [animation-delay:2.4s]",
        ].map((pos) => (
          <span
            key={pos}
            className={`${wispCls} ${pos} ${result ? "size-[38px] bg-[#B37BFF]/40" : "size-[26px] bg-slime-light/35"}`}
          />
        ))}
      </div>

      <div className="relative flex w-full max-w-[560px] flex-none items-end justify-center desk:max-h-[420px] desk:min-h-[220px] desk:flex-[1_1_0]">
        {/* graveyard behind everything; on desktop it's 148% wide so it peeks
            out both sides, on narrow screens it's tighter and sits a bit higher */}
        <Graveyard className="pointer-events-none absolute bottom-[16%] -left-[6%] z-0 h-auto w-[112%] desk:bottom-[7%] desk:-left-[24%] desk:w-[148%]" />
        <Pumpkin
          className={`${pumpkinCls} left-0 w-[26%] -rotate-6`}
          face="grin"
        />
        <Cauldron />
        <Pumpkin
          className={`${pumpkinCls} right-0 w-[22%] rotate-5`}
          face="spooky"
        />
        <Pumpkin
          className={`${pumpkinCls} right-[19%] -bottom-0.5 w-[11%]`}
          face="grin"
        />
      </div>
    </section>
  );
}

export default CauldronStage;
