import dotenv from "dotenv";
import pkg from "pg";

dotenv.config({ path: "../.env" });
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});