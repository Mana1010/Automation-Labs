const formatters = {
  "en-PH": new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }),
  "en-US": new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }),
} as const;

export function formatNumbers(
  locale: keyof typeof formatters,
  value: number | null,
) {
  return formatters[locale].format(value ?? 0);
}
