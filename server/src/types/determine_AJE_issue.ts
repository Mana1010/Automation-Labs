type Flag = 0 | 1;

interface FrappeBase {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  idx: number;
  docstatus: 0 | 1 | 2; // 0 = Draft, 1 = Submitted, 2 = Cancelled
}

interface FrappeChild extends FrappeBase {
  parent: string;
  parentfield: string;
  parenttype: string;
}

export interface SalesInvoiceItem extends FrappeChild {
  parentfield: "items";
  parenttype: "Sales Invoice";
  doctype: "Sales Invoice Item";
  item_code: string;
  supplier: string;
  item_name: string;
  coverage: string;
  client_type: string;
  policy_number: string;
  supplier_commission_rate: number;
  commission_amount: number;
  flat_amount_commission: number;
  vat: number;
  ds: number;
  fst: number;
  fs: number;
  mt: number;
  premium: number;
  others: number;
  is_flat_amount: Flag;
  is_vat_inclusive: Flag;
  vat_amount: number;
  ds_amount: number;
  fst_amount: number;
  fs_amount: number;
  mt_amount: number;
  others_amount: number;
  total_sum_insured: number;
  description: string;
  item_group: string;
  image: string;
  qty: number;
  stock_uom: string;
  uom: string;
  conversion_factor: number;
  stock_qty: number;
  price_list_rate: number;
  base_price_list_rate: number;
  margin_type: string;
  margin_rate_or_amount: number;
  rate_with_margin: number;
  discount_percentage: number;
  discount_amount: number;
  base_rate_with_margin: number;
  rate: number;
  amount: number;
  base_rate: number;
  base_amount: number;
  pricing_rules: string;
  stock_uom_rate: number;
  is_free_item: Flag;
  grant_commission: Flag;
  net_rate: number;
  net_amount: number;
  base_net_rate: number;
  base_net_amount: number;
  delivered_by_supplier: Flag;
  income_account: string;
  is_fixed_asset: Flag;
  expense_account: string;
  enable_deferred_revenue: Flag;
  weight_per_unit: number;
  total_weight: number;
  warehouse: string;
  incoming_rate: number;
  allow_zero_valuation_rate: Flag;
  item_tax_rate: string; // JSON string, e.g. "{}"
  actual_batch_qty: number;
  actual_qty: number;
  delivered_qty: number;
  cost_center: string;
  page_break: Flag;
}

export interface SalesTaxesAndCharges extends FrappeChild {
  parentfield: "taxes";
  parenttype: "Sales Invoice";
  doctype: "Sales Taxes and Charges";
  charge_type: string;
  account_head: string;
  additional_charge_type: string;
  account_type: string;
  description: string;
  included_in_print_rate: Flag;
  included_in_paid_amount: Flag;
  cost_center: string;
  rate: number;
  rate_llib: number;
  atc: string;
  atc_rate: number;
  use_custom_tax_base: Flag;
  custom_tax_base: number;
  custom_base_tax_base: number;
  account_currency: string;
  tax_amount: number;
  total: number;
  tax_amount_after_discount_amount: number;
  base_tax_amount: number;
  base_total: number;
  base_tax_amount_after_discount_amount: number;
  item_wise_tax_detail: string; // JSON string, e.g. '{"Premium":[0.0,0.0]}'
  dont_recompute_tax: Flag;
}

export interface PaymentSchedule extends FrappeChild {
  parentfield: "payment_schedule";
  parenttype: "Sales Invoice";
  doctype: "Payment Schedule";
  due_date: string;
  invoice_portion: number;
  discount: number;
  payment_amount: number;
  outstanding: number;
  paid_amount: number;
  discounted_amount: number;
  base_payment_amount: number;
}

// Always empty in your sample, so row shapes are unknown
type UnknownRow = Record<string, unknown>;

export interface SalesInvoice extends FrappeBase {
  doctype: "Sales Invoice";
  title: string;
  naming_series: string;
  account_officer: string;
  policy_name: string;
  business_style: string;
  print_format_label: string;
  customer: string;
  different_insured: Flag;
  customer_name: string;
  tax_id: string;
  is_pos: Flag;
  is_consolidated: Flag;
  is_return: Flag;
  is_debit_note: Flag;
  is_renewal: Flag;
  is_non_vat: Flag;
  sale_type: string;
  transaction_type: string;
  is_commission_sales_invoice: Flag;
  is_vat_inclusive: Flag;
  is_various_suppliers: Flag;
  adjustment_journal_entry: string | null; // empty on invoices without an adjustment
  update_billed_amount_in_sales_order: Flag;
  company: string;
  company_tax_id: string;
  posting_date: string;
  posting_time: string;
  set_posting_time: Flag;
  due_date: string;
  effectivity: string;
  expiry: string;
  supplier_commission_rate: number;
  commission_amount: number;
  flat_amount_commission: number;
  create_commission_sales_invoice: Flag;
  po_no: string;
  territory: string;
  shipping_address_name: string;
  currency: string;
  conversion_rate: number;
  selling_price_list: string;
  price_list_currency: string;
  plc_conversion_rate: number;
  ignore_pricing_rule: Flag;
  update_stock: Flag;
  department: string;
  is_deferred_income: Flag;
  less_withholding_tax: Flag;
  remarks_llib: string;
  ds: number;
  fst: number;
  mt: number;
  ds_amount: number;
  fst_amount: number;
  mt_amount: number;
  total_billing_amount: number;
  total_billing_hours: number;
  total_qty: number;
  base_total: number;
  base_net_total: number;
  total_net_weight: number;
  total: number;
  net_total: number;
  tax_category: string;
  // other_charges_calculation intentionally omitted (HTML table)
  base_total_taxes_and_charges: number;
  total_taxes_and_charges: number;
  loyalty_points: number;
  loyalty_amount: number;
  redeem_loyalty_points: Flag;
  apply_discount_on: string;
  is_cash_or_non_trade_discount: Flag;
  base_discount_amount: number;
  additional_discount_percentage: number;
  discount_amount: number;
  base_grand_total: number;
  base_rounding_adjustment: number;
  base_rounded_total: number;
  base_in_words: string;
  grand_total: number;
  rounding_adjustment: number;
  rounded_total: number;
  in_words: string;
  total_advance: number;
  outstanding_amount: number;
  disable_rounded_total: Flag;
  write_off_amount: number;
  base_write_off_amount: number;
  write_off_outstanding_amount_automatically: Flag;
  allocate_advances_automatically: Flag;
  ignore_default_payment_terms_template: Flag;
  base_paid_amount: number;
  paid_amount: number;
  base_change_amount: number;
  change_amount: number;
  letter_head: string;
  group_same_items: Flag;
  language: string;
  status: string; // e.g. "Paid", "Unpaid", "Overdue"
  customer_group: string;
  is_internal_customer: Flag;
  is_discounted: Flag;
  debit_to: string;
  premiums_receivable: string;
  premiums_payable: string;
  clearing_account: string;
  output_vat: string;
  prepaid_tax: string;
  commission_income: string;
  deferred_income: string;
  round_off_account: string;
  party_account_currency: string;
  is_opening: string; // "Yes" | "No"
  c_form_applicable: string; // "Yes" | "No"
  remarks: string;
  amount_eligible_for_commission: number;
  commission_rate: number;
  total_commission: number;
  against_income_account: string;

  // child tables
  commission_sales_invoice: UnknownRow[];
  items: SalesInvoiceItem[];
  pricing_rules: UnknownRow[];
  packed_items: UnknownRow[];
  timesheets: UnknownRow[];
  taxes: SalesTaxesAndCharges[];
  advances: UnknownRow[];
  payment_schedule: PaymentSchedule[];
  payments: UnknownRow[];
  sales_team: UnknownRow[];
}
