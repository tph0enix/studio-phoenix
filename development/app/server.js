import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "pg";
import usersRouter from "./src/routes/users.js";

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/users", usersRouter);

import { errorHandler } from "./src/middleware/error.js";
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});