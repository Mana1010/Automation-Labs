import {
  GLEntry,
  JournalEntry,
  SalesInvoice,
} from "./../types/determine_AJE_issue";
import axios, { AxiosError } from "axios";
import type { Request, Response } from "express";
import { checkAJEDiscrepancy } from "../utils/checkAJEDiscrepancy";
import { getAJERelation } from "../utils/getAJERelations";
import { addInGoogleSheet } from "../api/google-sheet";

export default async function determineAJEIssue(req: Request, res: Response) {
  const { apiSecret, apiKey, urlDomain, sheetId } = req.body;
  let total = 0;
  if (!apiSecret || !apiKey || !urlDomain || !sheetId) {
    res.status(401).json({ message: "Something went wrong" });
    return;
  }

  // SOA
  //   SOA (USD)
  // SOA (PHP)
  // SOA (Conversion Rate)
  // Adjustment Journal Entry
  // Total Debit & Credit In Table
  // Conversion Rate on Table
  // Total Debit & Credit
  let googleSheetPayload = [] as any[];

  try {
    const [siRes, jeRes, glRes] = await Promise.all([
      axios.get<{ data: SalesInvoice[] }>(
        `${urlDomain}/api/resource/Sales Invoice`,
        {
          headers: { Authorization: `token ${apiKey}:${apiSecret}` },
          params: {
            limit_page_length: 0,
            filters: JSON.stringify([
              ["posting_date", "<=", "2026-02-01"],
              ["name", "like", "%SOA-%"],
              ["party_account_currency", "=", "USD"],
            ]),
            fields: JSON.stringify([
              "name",
              "grand_total",
              "conversion_rate",
              "adjustment_journal_entry",
            ]),
          },
        },
      ),
      axios.get<{ data: JournalEntry[] }>(
        `${urlDomain}/api/resource/Journal Entry`,
        {
          headers: { Authorization: `token ${apiKey}:${apiSecret}` },
          params: {
            limit_page_length: 0,
            filters: JSON.stringify([["posting_date", "<=", "2026-03-01"]]),
            fields: JSON.stringify([
              "name",
              "total_debit",
              "total_credit",
              "parent_sales_invoice",
              "`tabJournal Entry Account`.name AS jea_name",
              "`tabJournal Entry Account`.exchange_rate AS jea_rate",
              "`tabJournal Entry Account`.debit_in_account_currency AS jea_debit_in_currency",
              "`tabJournal Entry Account`.credit_in_account_currency AS jea_credit_in_currency",
              "`tabJournal Entry Account`.credit AS jea_credit",
              "`tabJournal Entry Account`.debit AS jea_debit",
            ]),
          },
        },
      ),

      axios.get<{ data: GLEntry[] }>(`${urlDomain}/api/resource/GL Entry`, {
        headers: { Authorization: `token ${apiKey}:${apiSecret}` },
        params: {
          limit_page_length: 0,
          filters: JSON.stringify([["posting_date", "<=", "2026-03-01"]]),
          fields: JSON.stringify([
            "name",
            "debit",
            "credit",
            "voucher_no",
            "debit_in_account_currency",
            "credit_in_account_currency",
          ]),
        },
      }),
    ]);

    const getSi = siRes?.data.data;
    const getJe = jeRes?.data.data;
    const getGL = glRes?.data.data;
    if (getSi.length <= 0 && getJe.length <= 0 && getGL.length <= 0) return;
    console.log(getSi.length);
    for (let i = 0; i < getSi.length; i++) {
      const siData = getSi[i] as SalesInvoice;

      const [glEntriesRelated, jeEntriesRelated] = getAJERelation(
        siData?.name,
        getJe,
        getGL,
      );

      //This is where you check and formulate a description and code after checking for any discrepancies
      const isAJEHasDiscrepancy = checkAJEDiscrepancy(
        siData,
        jeEntriesRelated,
        glEntriesRelated,
        googleSheetPayload,
      );

      const isAJECorrect = (isAJEHasDiscrepancy?.length ?? 0) > 0;
      if (isAJECorrect) continue;
    }
    const totalDiscrepancies = googleSheetPayload.length;
    addInGoogleSheet(sheetId, googleSheetPayload);
    res.status(200).json({
      data: totalDiscrepancies,
    });
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      res.status(500).json({ data: err?.response?.data });
    }
  }
}
