import { Router } from "express";
import { pool } from "../db/pool.js";

const router = Router();

// GET /users  (never return password_hash)
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT key, email, role, created_at, updated_at
       FROM public.users
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
