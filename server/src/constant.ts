const JE_TOTAL_DEBIT_CREDIT_NOT_MATCH = `Journal Entry Total Debit & Credit not match to SOA`;

const JEA_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH = `Journal Entry Account Total Debit or Credit in currency not match to SOA`;

const JEA_DEBIT_CREDIT_IN_PHP_NOT_MATCH = `Journal Entry Account Total Debit or Credit in PHP not match to SOA`;

const JEA_EXCHANGE_RATE_NOT_MATCH = `Journal Entry Account exchange rate not match`;

const GL_ENTRY_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH = `GL Entry Total Debit or Credit in currency not match to SOA`;

const GL_ENTRY_DEBIT_CREDIT_IN_PHP_NOT_MATCH = `GL Entry Total Debit or Credit in PHP not match to SOA`;

const JEA_MULTIPLE_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH = `Journal Entry Account Multiple total debit or credit in currency not match to SOA`;

const JEA_MULTIPLE_DEBIT_CREDIT_IN_PHP_NOT_MATCH = `Journal Entry Account Multiple total debit or credit in PHP not match to SOA`;
const obj = {
  JE_TOTAL_DEBIT_CREDIT_NOT_MATCH,
  JEA_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH,
  JEA_DEBIT_CREDIT_IN_PHP_NOT_MATCH,
  GL_ENTRY_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH,
  GL_ENTRY_DEBIT_CREDIT_IN_PHP_NOT_MATCH,
  JEA_EXCHANGE_RATE_NOT_MATCH,
  JEA_MULTIPLE_DEBIT_CREDIT_IN_CURRENCY_NOT_MATCH,
  JEA_MULTIPLE_DEBIT_CREDIT_IN_PHP_NOT_MATCH,
};

export type SentenceList = keyof typeof obj;
export function descriptionFormat(sentences: SentenceList[]): string {
  let format = ``;
  const removeDuplicate = new Set(sentences);
  for (const sentence of Array.from(removeDuplicate)) {
    format += `\n${obj[sentence]}`;
  }
  return format;
}

export type CodesInObj = Record<"JEA" | "JE" | "GL", string[]>;
export function formatCodes(obj: CodesInObj) {
  const codes = Object.values(obj).flat(1);
  let format = ``;

  for (const code of codes) {
    format += `${code}\n`;
  }
  return format;
}
