import {
  CodesInObj,
  descriptionFormat,
  formatCodes,
  SentenceList,
} from "../constant";
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
  const obj = je?.map((g) => {
    return {
      soa: si.name,
      je: g.name,
      jea: g.jea_name,
    };
  });

  // console.log(JSON.stringify(obj));
  // console.log(gl?.length);
  if (!je || !gl) return;

  const grandSoaUSD = Math.abs(si?.grand_total ?? 0);
  const soaConversionRate = si?.conversion_rate || 1;
  const grandSoaPHP = grandSoaUSD * soaConversionRate;
  const [totalJeaDebit, totalJeaCredit] = calculateTotalDebitOrCredit(je);
  const [totalJeaDebitCurr, totalJeaCreditCurr] =
    calculateTotalDebitOrCreditInCurrency(je);
  const updatedDataArr = [] as (JournalEntry & {
    sentences: SentenceList[];
    codes: CodesInObj;
  })[];

  // //If null means the jea are multiple
  const nonMultiJE = je.reduce(
    (acc, val) => {
      if (acc[val.name] === 2 || acc[val.name] === null) {
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

  // const boleh = Object.entries(nonMultiJE)
  //   // oxlint-disable-next-line no-unused-vars
  //   .filter(([_, value]) => value === null)
  //   .map((d) => d[0]);

  // console.log(boleh);
  // if (totalJeaDebit !== grandSoaPHP || totalJeaCredit !== grandSoaPHP) {
  //   sentences.push("JEA_MULTIPLE_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH");
  // }

  // if (grandSoaUSD !== totalJeaDebitCurr || grandSoaUSD !== totalJeaCreditCurr) {
  //   sentences.push("JEA_MULTIPLE_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH");
  // }

  function jeaCodescript(
    jeaName: string | null,
    type: "credit" | "debit",
    operation: "-" | "",
  ) {
    return `
         # Journal Entry Account (${type[0]?.toUpperCase() + type.slice(1)} in Account Currency)
          frappe.db.set_value('Journal Entry Account', '${jeaName}', {
          'exchange_rate': ${soaConversionRate},
          '${type}': ${operation}${grandSoaPHP},
          '${type}_in_account_currency': ${operation}${grandSoaUSD}
          })
        `;
  }

  for (const item of je) {
    if (!twiceJeaOnly.includes(item.name)) {
      continue;
    }
    let findJeIndex = updatedDataArr.findIndex((j) => j.name === item.name);
    const totalDebit = Math.abs(item.total_debit);
    const totalCredit = Math.abs(item.total_credit);
    const jeaTotalCredit = Math.abs(item.jea_credit || 0);
    const jeaTotalDebit = Math.abs(item.jea_debit || 0);

    //If the journal entry is not present yet
    if (findJeIndex === -1) {
      updatedDataArr.push({
        ...item,
        sentences: [],
        codes: {
          JE: [],
          JEA: [],
          GL: [],
        },
      });
      findJeIndex = updatedDataArr.length - 1;
    }

    const jeaCodes = updatedDataArr[findJeIndex]?.codes.JEA;
    const jeCodes = updatedDataArr[findJeIndex]?.codes.JE;
    const isNegativeJe = item.total_credit < 0 ? "-" : "";
    //For Journal Entry
    if (grandSoaPHP !== totalCredit || grandSoaPHP !== totalDebit) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JE_TOTAL_DEBIT_CREDIT_NOT_MATCH",
      );
      if (jeCodes?.length === 0) {
        const codeScript = `
        #Auto Created Journal Entry
        frappe.db.set_value('Journal Entry', '${item.name}', {
        'total_credit': ${isNegativeJe}${grandSoaPHP},
        'total_debit': ${isNegativeJe}${grandSoaPHP}
        })
        `;
        jeCodes?.push(codeScript);
      }
    }

    //For Journal Entry Account
    const isNegativeJeaDebit = (item.jea_debit || 0) < 0 ? "-" : "";
    const isNegativeJeaCredit = (item.jea_credit || 0) < 0 ? "-" : "";
    let isCreditIncluded = jeaCodes?.some((c) => c.includes("credit"));
    let isDebitIncluded = jeaCodes?.some((c) => c.includes("debit"));
    if (jeaTotalDebit > 0 && grandSoaPHP !== jeaTotalDebit) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JEA_DEBIT_CREDIT_IN_PHP_NOT_MATCH",
      );

      if (!isDebitIncluded) {
        jeaCodes?.push(
          jeaCodescript(item.jea_name, "debit", isNegativeJeaCredit),
        );
        isDebitIncluded = jeaCodes?.some((c) => c.includes("debit"));
      }
    }

    if (jeaTotalCredit > 0 && grandSoaPHP !== jeaTotalCredit) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JEA_DEBIT_CREDIT_IN_PHP_NOT_MATCH",
      );
      if (!isCreditIncluded) {
        jeaCodes?.push(
          jeaCodescript(item.jea_name, "credit", isNegativeJeaCredit),
        );
        isCreditIncluded = jeaCodes?.some((c) => c.includes("credit"));
      }
    }

    if (
      (item.jea_credit_in_currency || 0) > 0 &&
      grandSoaUSD !== item.jea_credit_in_currency
    ) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JEA_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH",
      );

      if (!isCreditIncluded) {
        jeaCodes?.push(
          jeaCodescript(item.jea_name, "credit", isNegativeJeaCredit),
        );
        isCreditIncluded = jeaCodes?.some((c) => c.includes("credit"));
      }
    }

    if (
      (item.jea_debit_in_currency || 0) > 0 &&
      grandSoaUSD !== item.jea_debit_in_currency
    ) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JEA_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH",
      );
      if (!isDebitIncluded) {
        jeaCodes?.push(
          jeaCodescript(item.jea_name, "debit", isNegativeJeaDebit),
        );
        isDebitIncluded = jeaCodes?.some((c) => c.includes("debit"));
      }
    }

    if (
      !isSameAmount(soaConversionRate, item.jea_rate ?? 0, "RATE_TOLERANCE")
    ) {
      updatedDataArr[findJeIndex]?.sentences.push(
        "JEA_EXCHANGE_RATE_NOT_MATCH",
      );

      if (!isDebitIncluded && !isCreditIncluded) {
        const codeScript = `
          frappe.db.set_value('Journal Entry Account', '${item.jea_name}', {
          'exchange_rate': ${soaConversionRate},
          })
        `;
        isCreditIncluded = jeaCodes?.some((c) => c.includes("credit"));
        isDebitIncluded = jeaCodes?.some((c) => c.includes("debit"));
        jeaCodes?.push(codeScript);
      }
    }
  }

  function glCodescript(
    glName: string | null,
    type: "credit" | "debit",
    isNegative: "-" | "",
  ) {
    return `
         # GL Entry (${type[0]?.toUpperCase() + type.slice(1)} in Account Currency)
          frappe.db.set_value('GL Entry', '${glName}', {
          '${type}': ${isNegative}${grandSoaPHP},
          '${type}_in_account_currency': ${isNegative}${grandSoaUSD}
          })                                                                                                                                                  
        `;
  }
  for (const item of gl) {
    if (!twiceJeaOnly.includes(item.voucher_no)) continue;
    const findJeIndex = updatedDataArr.findIndex(
      (j) => j.name === item.voucher_no,
    );

    if (findJeIndex === -1) continue;

    const totalDebit = Math.abs(item.debit);
    const totalCredit = Math.abs(item.credit);
    const isNegativeDebit = item.debit < 0 ? "-" : "";
    const isNegativeCredit = item.credit < 0 ? "-" : "";
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
    if (totalDebit > 0) {
      updatedDataArr[findJeIndex]?.codes.GL.push(
        glCodescript(item.name, "debit", isNegativeDebit),
      );
    } else if (totalCredit > 0) {
      updatedDataArr[findJeIndex]?.codes.GL.push(
        glCodescript(item.name, "credit", isNegativeCredit),
      );
    }
  }

  const formattedJeDataList = updatedDataArr.map((j) => {
    // oxlint-disable-next-line no-unused-vars
    const { sentences, codes, ...d } = j;
    return {
      ...d,
      description: descriptionFormat(sentences),
      code: formatCodes(codes),
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
