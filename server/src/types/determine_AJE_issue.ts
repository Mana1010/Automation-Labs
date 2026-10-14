export type SalesInvoice = {
  name: string;
  grand_total: number;
  conversion_rate: number;
  adjustment_journal_entry: string | null;
};

// One row per Journal Entry Account line (result of the join)
export type JournalEntry = {
  name: string; // add "name" to your fields list, it's currently missing
  total_debit: number;
  total_credit: number;
  parent_sales_invoice: string | null;
  jea_name: string | null; // child row ID
  jea_rate: number | null;
  jea_debit_in_currency: number | null;
  jea_credit_in_currency: number | null;
  jea_credit: number | null;
  jea_debit: number | null;
};

export type GLEntry = {
  name: string;
  debit: number;
  credit: number;
  voucher_no: string;
  debit_in_account_currency: number;
  credit_in_account_currency: number;
};
