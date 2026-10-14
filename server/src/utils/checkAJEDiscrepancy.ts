import { descriptionFormat, SentenceList } from "../constant";
import {
  GLEntry,
  JournalEntry,
  SalesInvoice,
} from "../types/determine_AJE_issue";
import { formatLarkSheetPayload } from "./formatLarkSheetPayload";

export function checkAJEDiscrepancy(
  si: SalesInvoice,
  je: JournalEntry[] | undefined,
  gl: GLEntry[] | undefined,
  larkSheetPayload: any[],
) {
  if (!je || !gl) return;
  let sentences = [] as SentenceList[];
  const grandSoaUSD = Math.abs(si?.grand_total ?? 0);
  const conversionRate = si?.conversion_rate || 1;
  const grandSoaPHP = grandSoaUSD * conversionRate;

  const [totalJeaDebit, totalJeaCredit] = calculateTotalDebitOrCredit(je);
  const [totalJeaDebitCurr, totalJeaCreditCurr] =
    calculateTotalDebitOrCreditInCurrency(je);
  if (totalJeaDebit !== grandSoaPHP || totalJeaCredit !== grandSoaPHP) {
    sentences.push("JEA_MULTIPLE_DEBIT_CREDIT_IN_PHP_NOT_MATCH");
  }

  if (grandSoaUSD !== totalJeaDebitCurr || grandSoaUSD !== totalJeaCreditCurr) {
    sentences.push("JEA_MULTIPLE_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH");
  }

  for (const item of je) {
    const totalDebit = Math.abs(item.total_debit);
    const totalCredit = Math.abs(item.total_credit);
    const jeaTotalCredit = Math.abs(item.jea_credit || 0);
    const jeaTotalDebit = Math.abs(item.jea_debit || 0);
    if (grandSoaPHP !== totalCredit || grandSoaPHP !== totalDebit) {
      sentences.push("JE_TOTAL_DEBIT_CREDIT_NOT_MATCH");
    }
    if (
      jeaTotalDebit > 0 &&
      grandSoaPHP !== jeaTotalDebit &&
      !(je.length > 2)
    ) {
      sentences.push("JEA_DEBIT_CREDIT_IN_PHP_NOT_MATCH");
    }

    if (
      jeaTotalCredit > 0 &&
      grandSoaPHP !== jeaTotalCredit &&
      !(je.length > 2)
    ) {
      sentences.push("JEA_DEBIT_CREDIT_IN_PHP_NOT_MATCH");
    }

    if (
      (item.jea_credit_in_currency || 0) > 0 &&
      grandSoaUSD !== item.jea_credit_in_currency &&
      !(je.length > 2)
    ) {
      sentences.push("JEA_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH");
    }

    if (
      (item.jea_debit_in_currency || 0) > 0 &&
      grandSoaUSD !== item.jea_debit_in_currency &&
      !(je.length > 2)
    ) {
      sentences.push("JEA_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH");
    }

    if (conversionRate !== item.jea_rate) {
      sentences.push("JEA_EXCHANGE_RATE_NOT_MATCH");
    }
  }

  for (const item of gl) {
    const totalDebit = Math.abs(item.debit);
    const totalCredit = Math.abs(item.credit);

    if (grandSoaPHP !== totalCredit || grandSoaUSD !== totalDebit) {
      sentences.push("GL_ENTRY_DEBIT_CREDIT_IN_PHP_NOT_MATCH");
    }

    if (
      (grandSoaUSD !== item.credit_in_account_currency ||
        grandSoaPHP !== item.debit_in_account_currency) &&
      !(gl.length > 2)
    ) {
      sentences.push("GL_ENTRY_DEBIT_CREDIT_IN_NOT_MATCH");
    }
  }
  formatLarkSheetPayload(larkSheetPayload, si, je, gl);
  return descriptionFormat(sentences);
}

function calculateTotalDebitOrCredit(je: JournalEntry[]) {
  const total = je.reduce(
    (acc, val) => {
      const debit = Math.abs(val.jea_debit ?? 0);
      const credit = Math.abs(val.jea_credit ?? 0);
      return {
        total_debit: acc.total_debit + debit,
        total_credit: acc.total_credit + credit,
      };
    },
    {
      total_debit: 0,
      total_credit: 0,
    },
  );

  return [total.total_debit, total.total_credit];
}

function calculateTotalDebitOrCreditInCurrency(je: JournalEntry[]) {
  const total = je.reduce(
    (acc, val) => {
      const debit = Math.abs(val.jea_debit_in_currency ?? 0);
      const credit = Math.abs(val.jea_debit_in_currency ?? 0);
      return {
        total_debit: acc.total_debit + debit,
        total_credit: acc.total_credit + credit,
      };
    },
    {
      total_debit: 0,
      total_credit: 0,
    },
  );
  return [total.total_debit, total.total_credit];
}
