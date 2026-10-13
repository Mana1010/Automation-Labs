// Every automation in the lab. Add new entries here and they show up in the
// selector at the top of the form; `tagline` becomes the header subtitle.
export type Automation = {
  id: string
  name: string
  tagline: string
  icon: string
  comingSoon?: boolean
}

export const AUTOMATIONS: Automation[] = [
  {
    id: 'lark-erpnext',
    name: 'Lark Sheet → ERPNext',
    tagline: 'Brew your Lark Sheet into ERPNext',
    icon: '📊',
  },
  {
    id: 'coming-soon',
    name: 'More brews soon',
    tagline: 'A new automation is still simmering…',
    icon: '🧪',
    comingSoon: true,
  },
]
