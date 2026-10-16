import { descriptionFormat, SentenceList } from "../constant";
import {
  GLEntry,
  JournalEntry,
  SalesInvoice,
} from "../types/determine_AJE_issue";
import { formatLarkSheetPayload } from "./formatLarkSheetPayload";
import { isSameAmount } from "./money-tolerance";

let total = 0;
export function checkAJEDiscrepancy(
  si: SalesInvoice,
  je: JournalEntry[] | undefined,
  gl: GLEntry[] | undefined,
  larkSheetPayload: any[],
) {
  if (!je || !gl) return;

  const grandSoaUSD = Math.abs(si?.grand_total ?? 0);
  const conversionRate = si?.conversion_rate || 1;
  const grandSoaPHP = grandSoaUSD * conversionRate;
  const [totalJeaDebit, totalJeaCredit] = calculateTotalDebitOrCredit(je);
  const [totalJeaDebitCurr, totalJeaCreditCurr] =
    calculateTotalDebitOrCreditInCurrency(je);
  const updatedDataArr = [] as (JournalEntry & { sentences: SentenceList[] })[];
  //If null means the jea are multiple
  const nonMultiJE = je.reduce(
    (acc, val) => {
      if (acc[val.name] === 2) {
        acc[val.name] = null;
      } else {
        acc[val.name] = (acc[val.name] ?? 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number | null>,
  );

  //This check to ensure that only two JEA (Premium and Clearing) can be done
  const twiceJeaOnly = Object.entries(nonMultiJE)
    // oxlint-disable-next-line no-unused-vars
    .filter(([_, value]) => value !== null)
    .map((d) => d[0]);

  // if (totalJeaDebit !== grandSoaPHP || totalJeaCredit !== grandSoaPHP) {
  //   sentences.push("JEA_MULTIPLE_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH");
  // }

  // if (grandSoaUSD !== totalJeaDebitCurr || grandSoaUSD !== totalJeaCreditCurr) {
  //   sentences.push("JEA_MULTIPLE_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH");
  // }

  for (const item of je) {
    if (!twiceJeaOnly.includes(item.name)) continue;

    let findJeIndex = updatedDataArr.findIndex((j) => j.name === item.name);
    const totalDebit = Math.abs(item.total_debit);
    const totalCredit = Math.abs(item.total_credit);
    const jeaTotalCredit = Math.abs(item.jea_credit || 0);
    const jeaTotalDebit = Math.abs(item.jea_debit || 0);

    //If the journal entry is not present yet
    if (findJeIndex === -1) {
      updatedDataArr.push({ ...item, sentences: [] });
      findJeIndex = updatedDataArr.length - 1;
    }

    if (grandSoaPHP !== totalCredit || grandSoaPHP !== totalDebit) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JE_TOTAL_DEBIT_CREDIT_NOT_MATCH",
      );
    }
    if (jeaTotalDebit > 0 && grandSoaPHP !== jeaTotalDebit) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JEA_DEBIT_CREDIT_IN_PHP_NOT_MATCH",
      );
    }

    if (jeaTotalCredit > 0 && grandSoaPHP !== jeaTotalCredit) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JEA_DEBIT_CREDIT_IN_PHP_NOT_MATCH",
      );
    }

    if (
      (item.jea_credit_in_currency || 0) > 0 &&
      grandSoaUSD !== item.jea_credit_in_currency
    ) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JEA_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH",
      );
    }

    if (
      (item.jea_debit_in_currency || 0) > 0 &&
      grandSoaUSD !== item.jea_debit_in_currency
    ) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JEA_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH",
      );
    }

    if (!isSameAmount(conversionRate, item.jea_rate ?? 0, "RATE_TOLERANCE")) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JEA_EXCHANGE_RATE_NOT_MATCH",
      );
    }
  }

  for (const item of gl) {
    if (!twiceJeaOnly.includes(item.voucher_no)) continue;

    const findJeIndex = updatedDataArr.findIndex(
      (j) => j.name === item.voucher_no,
    );

    if (findJeIndex === -1) continue;

    const totalDebit = Math.abs(item.debit);
    const totalCredit = Math.abs(item.credit);

    if (grandSoaPHP !== totalCredit || grandSoaPHP !== totalDebit) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "GL_ENTRY_DEBIT_CREDIT_IN_PHP_NOT_MATCH",
      );
    }

    if (
      grandSoaUSD !== item.credit_in_account_currency ||
      grandSoaUSD !== item.debit_in_account_currency
    ) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "GL_ENTRY_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH",
      );
    }
  }

  const formattedJeDataList = updatedDataArr.map((j) => {
    // oxlint-disable-next-line no-unused-vars
    const { sentences, ...d } = j;

    return {
      ...d,
      description: descriptionFormat(sentences),
    };
  });

  formatLarkSheetPayload(larkSheetPayload, si, formattedJeDataList);
  return formattedJeDataList;
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
      const credit = Math.abs(val.jea_credit_in_currency ?? 0);
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
