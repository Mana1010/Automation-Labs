import {
  GLEntry,
  JournalEntry,
  SalesInvoice,
} from "../types/determine_AJE_issue";

// SOA
//   SOA (USD)
// SOA (PHP)
// SOA (Conversion Rate)
// Journal Entry
// Total Debit & Credit In Table
// Conversion Rate on Table
// Total Debit & Credit
export function formatLarkSheetPayload(
  larkSheetPayload: any[][],
  si: SalesInvoice,
  je: JournalEntry[],
  gl: GLEntry[],
) {
  let shapeData = {
    soaId: si.name,
    soaUSD: si.grand_total,
    soaPHP: Math.abs(si.grand_total) * si.conversion_rate,
    journalEntry: "",
    totalDebitAndCreditJea: 0,
    conversionRate: si.conversion_rate,
    totalDebitAndCredit: 0,
  };

  const isAbove2JEA = je.length > 2 && gl.length > 2;

  if (isAbove2JEA) return;

  for (const item of je) {
    shapeData = {
      ...shapeData,
      journalEntry: item.name,
      totalDebitAndCreditJea: (item.jea_credit || item.jea_debit) ?? 0,
      totalDebitAndCredit: item.total_credit || item.total_debit,
    };
  }
  larkSheetPayload.push([shapeData]);
  return;
}
