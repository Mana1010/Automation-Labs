import Cauldron from './Cauldron'
import Graveyard from './Graveyard'
import Pumpkin from './Pumpkin'

type CauldronStageProps = {
  isLoading?: boolean
}

const wispCls = 'absolute bottom-0 size-[26px] animate-wisp rounded-full bg-slime-light/35 blur-[6px]'
const pumpkinCls = 'absolute bottom-0 z-2 h-auto drop-shadow-[0_8px_20px_rgba(255,122,26,0.35)]'

function CauldronStage({ isLoading = false }: CauldronStageProps) {
  return (
    <section
      className="relative flex min-w-0 flex-none flex-col items-center justify-end overflow-x-clip px-4 pt-2 desk:min-h-0 desk:flex-[1_1_480px]"
      aria-label="Brew results"
      aria-busy={isLoading}
    >
      {/*
        RESULT PLACEHOLDER — the brew output goes here, right above the cauldron.
        Replace the contents of #brew-result with your own result UI.
      */}
      <div
        id="brew-result"
        className="relative z-2 flex min-h-[140px] w-full max-w-[520px] flex-[0_1_auto] flex-col items-center justify-center gap-1.5 rounded-3xl border-2 border-dashed border-slime/45 bg-[radial-gradient(ellipse_at_50%_100%,rgba(124,227,90,0.14),rgba(13,9,19,0.5)_70%)] p-5 text-center text-sm text-mist short:min-h-[110px]"
      >
        <span className="font-mono text-[11px] tracking-[0.12em] text-slime uppercase">Result placeholder</span>
        <p className="m-0">Your brew will rise here…</p>
      </div>

      <div className="relative h-10 w-[200px] flex-none" aria-hidden="true">
        <span className={`${wispCls} left-10`} />
        <span className={`${wispCls} left-[90px] [animation-delay:1.2s]`} />
        <span className={`${wispCls} left-[140px] [animation-delay:2.4s]`} />
      </div>

      <div className="relative flex w-full max-w-[560px] flex-none items-end justify-center desk:max-h-[420px] desk:min-h-[220px] desk:flex-[1_1_0]">
        {/* graveyard behind everything; on desktop it's 148% wide so it peeks
            out both sides, on narrow screens it's tighter and sits a bit higher */}
        <Graveyard className="pointer-events-none absolute bottom-[16%] -left-[6%] z-0 h-auto w-[112%] desk:bottom-[7%] desk:-left-[24%] desk:w-[148%]" />
        <Pumpkin className={`${pumpkinCls} left-0 w-[26%] -rotate-6`} face="grin" />
        <Cauldron isLoading={isLoading} />
        <Pumpkin className={`${pumpkinCls} right-0 w-[22%] rotate-5`} face="spooky" />
        <Pumpkin className={`${pumpkinCls} right-[19%] -bottom-0.5 w-[11%]`} face="grin" />
      </div>
    </section>
  )
}

export default CauldronStage
