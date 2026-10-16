const MONEY_TOLERANCE = 0.01;
const RATE_TOLERANCE = 1e-6;

export const isSameAmount = (
  a: number,
  b: number,
  tol: "MONEY_TOLERANCE" | "RATE_TOLERANCE",
) =>
  Math.abs(a - b) <=
  (tol === "MONEY_TOLERANCE" ? MONEY_TOLERANCE : RATE_TOLERANCE);
