import path from "path";
import { google } from "googleapis";
import fs from "fs";

function loadKey() {
  const base64 = process.env.GOOGLE_KEY_BASE64!;
  if (base64) {
    const key = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(key);
  }
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src/key.json"), "utf8"),
  );
}
const key = loadKey();

export const SERVICE_EMAIL: string = key.client_email;
export async function addInGoogleSheet(
  sheetId: string,
  sheetRows: unknown[][],
) {
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
