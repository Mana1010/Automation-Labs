import express from "express";
import http from "http";
import cors from "cors";
import determineAJEIssue from "./controller/determine_AJE_issue";
import "dotenv/config";
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.post("/automation/aje-issue", determineAJEIssue);
server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
