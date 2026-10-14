import path from "path";
import { google } from "googleapis";
import fs from "fs";
const key = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src/key.json"), "utf8"),
);
export const SERVICE_EMAIL: string = key.client_email;
export async function addInGoogleSheet(
  sheetId: string,
  sheetRows: unknown[][],
) {
  console.log(key);
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const meta = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    fields: "sheets.properties.title",
  });
  const tabName = meta.data.sheets?.[0]?.properties?.title ?? "Sheet1";

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `'${tabName}'!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: sheetRows },
  });

  return { added: sheetRows.length };
}
