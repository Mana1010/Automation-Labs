import type { Automation } from '../automations'

type AutomationPickerProps = {
  automations: Automation[]
  selectedId: string
  onSelect: (id: string) => void
}

function AutomationPicker({ automations, selectedId, onSelect }: AutomationPickerProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">Choose a brew</span>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Automations">
        {automations.map((a) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={a.id === selectedId}
            disabled={a.comingSoon}
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-line-2 bg-card/85 px-3.5 font-sans text-[13px] font-semibold text-ink transition-[border-color,box-shadow] duration-200 enabled:hover:border-pumpkin aria-selected:border-pumpkin aria-selected:bg-pumpkin-deep/14 aria-selected:text-pumpkin-light aria-selected:shadow-[0_0_18px_-4px_rgba(255,154,61,0.5)] disabled:cursor-not-allowed disabled:border-dashed disabled:text-muted-2"
            onClick={() => onSelect(a.id)}
          >
            <span aria-hidden="true">{a.icon}</span>
            {a.name}
            {a.comingSoon && (
              <span className="rounded-md bg-moss px-1.5 py-px font-mono text-[10px] tracking-[0.08em] text-slime uppercase">
                Soon
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AutomationPicker
