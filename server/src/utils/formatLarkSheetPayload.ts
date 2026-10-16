import { formatNumbers } from "../api/format-numbers";
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
  je: (JournalEntry & { description: string })[],
) {
  const rows = [] as unknown[][];

  //Will update this.....
  const seen = new Set(rows.map((r) => r[3]));
  for (const item of je) {
    const totalDebitAndCreditJea =
      (item.jea_credit_in_currency || item.jea_debit_in_currency) ?? 0;
    const totalDebitAndCredit = item.total_credit || item.total_debit;
    // const checkDuplicateJE = rows.some((r) => r[3] === item.name);
    if (seen.has(item.name)) continue;
    seen.add(item.name);
    rows.push([
      si.name,
      formatNumbers("en-US", si.grand_total),
      formatNumbers("en-PH", Math.abs(si.grand_total) * si.conversion_rate),
      si.conversion_rate,
      item.name,
      formatNumbers("en-US", totalDebitAndCreditJea),
      item.jea_rate,
      formatNumbers("en-PH", totalDebitAndCredit),
      item.description,
    ]);
  }
  larkSheetPayload.push(...rows);
  return;
}
