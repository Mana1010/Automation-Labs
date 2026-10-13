import { SalesInvoice } from "./../types/determine_AJE_issue";
import axios from "axios";
import type { Request, Response } from "express";
async function addLarkSheet() {
  await axios.post(
    `https://open.larksuite.com/open-apis/sheets/v2/spreadsheets/${process.env.SHEET_ID}/values_append?insertDataOption=INSERT_ROWS`,
    {
      // The range only says which sheet and columns (A to D here).
      // Lark finds the first empty row after your existing data by itself.
      valueRange: {
        range: `bc1a69!A1:D1`,
        values: [["SOA-RET-2025-145349", 1870.5, "ACC-JV-2025-002892", "Paid"]],
      },
    },
    { headers: { Authorization: `Bearer ${process.env.TENANT_ACCESS_TOKEN}` } },
  );
}
async function getSalesInvoice(secret: string, key: string) {
  try {
    const fetchData = await axios.get(`${process.env.LLIB_URL}/Sales Invoice`, {
      headers: { Authorization: `token ${key}:${secret}` },
      params: {
        limit_page_length: 0,
        filters: JSON.stringify([
          ["posting_date", "<=", "2026-02-01"],
          ["name", "like", "%SOA-%"],
        ]),
        fields: JSON.stringify([
          "name",
          "grand_total",
          "adjustment_journal_entry",
        ]),
      },
    });
    const response = fetchData.data?.data as SalesInvoice[];
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

// async function getJournalEntry() {
//   try {
//     const fetchData = await axios.get(`${process.env.LLIB_URL}/Journal Entry`, {
//       headers: { Authorization: `token cd6d750e4a971d2:1c0554712b80f3d` },
//       params: {
//         limit_page_length: 0,
//         filters: JSON.stringify([
//           ["posting_date", "<=", "2026-02-01"],
//           ["name", "like", "%SOA-%"],
//         ]),
//         fields: JSON.stringify([
//           "name",
//           "grand_total",
//           "adjustment_journal_entry",
//         ]),
//       },
//     });
//     const response = fetchData.data?.data as SalesInvoice[];
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// }
export default function determineAJEIssue(req: Request, res: Response) {
  const { apiSecret, apiKey, urlDomain } = req.body();
  getSalesInvoice(apiKey, apiSecret);
}
