import { GLEntry, JournalEntry } from "../types/determine_AJE_issue";

export function getAJERelation(
  siID: string,
  je: JournalEntry[],
  gl: GLEntry[],
): [GLEntry[], JournalEntry[]] {
  const glEntriesRelated: GLEntry[] = [];
  const jeEntriesRelated: JournalEntry[] = [];

  for (let i = 0; i < je.length; i++) {
    const jeData = je[i];
    if (!jeData?.parent_sales_invoice) continue;

    if (jeData.parent_sales_invoice === siID) {
      jeEntriesRelated.push(jeData);
    }
  }
  const plainJeId = jeEntriesRelated.map((j) => j.name);
  for (let i = 0; i < gl.length; i++) {
    const glData = gl[i];
    if (!glData?.voucher_no.startsWith("ACC-PINV")) continue;
    if (plainJeId.includes(glData.voucher_no)) {
      glEntriesRelated.push(glData);
    }
  }

  return [glEntriesRelated, jeEntriesRelated];
}
