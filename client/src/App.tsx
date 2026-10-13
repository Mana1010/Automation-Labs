import { useState } from "react";
import { AUTOMATIONS } from "./automations";
import AutomationPicker from "./components/AutomationPicker";
import BrewForm from "./components/BrewForm";
import CauldronStage from "./components/CauldronStage";
import FlaskLogo from "./components/FlaskLogo";
import SpookyBackdrop from "./components/SpookyBackdrop";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState(AUTOMATIONS[0].id);
  const selected =
    AUTOMATIONS.find((a) => a.id === selectedId) ?? AUTOMATIONS[0];

  // Set to true while the automation runs — the cauldron gets stirred with a ladle.
  const isLoading = true;

  return (
    // Desktop (desk: 900px+): locked to one screen, no page scroll. Narrower: stacks and scrolls.
    <div className="relative flex min-h-screen flex-col overflow-hidden desk:h-dvh desk:min-h-0">
      <SpookyBackdrop />

      <header className="relative z-2 flex flex-none flex-wrap items-center gap-4 border-b border-header-line p-4 sm:px-10 short:py-2.5">
        <FlaskLogo className="size-16 flex-none short:size-12" />
        <div className="flex min-w-0 flex-auto flex-col gap-0.5">
          <h1 className="m-0 font-heading text-[34px] leading-[1.05] font-extrabold tracking-[-0.02em] text-ink-h short:text-[28px]">
            Automation{" "}
            <span className="font-spooky font-normal tracking-[0.04em] text-slime [text-shadow:0_0_18px_rgba(124,227,90,0.55)]">
              Labs
            </span>
          </h1>
          <p
            key={selected.id}
            className="m-0 max-w-[60ch] animate-tagline-in text-[clamp(13px,1.1vw,15px)] leading-[1.4] wrap-anywhere text-muted"
          >
            {selected.tagline}
          </p>
        </div>
        <span className="flex-none rounded-full border border-pumpkin/35 bg-pumpkin-deep/10 px-3 py-1.5 text-[13px] font-semibold text-pumpkin-light sm:ml-auto">
          🎃 Spooky season edition
        </span>
      </header>

      <main className="relative z-2 flex flex-1 flex-col gap-6 px-4 py-5 sm:gap-8 sm:px-10 desk:min-h-0 desk:flex-row desk:pb-6 short:pt-3.5 short:pb-4">
        <div className="flex min-w-0 flex-col gap-3 desk:min-h-0 desk:flex-[0_1_500px] short:gap-2.5">
          <AutomationPicker
            automations={AUTOMATIONS}
            selectedId={selected.id}
            onSelect={setSelectedId}
          />
          <BrewForm />
        </div>
        <CauldronStage isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
