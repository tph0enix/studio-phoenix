import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "pg";

dotenv.config({ path: '../.env' });

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // dev-friendly; tighten later
app.use(express.json());

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
})

app.get("/", (_req, res) => {
	res.set("Cache-Control", "no-store");
	res.send("Studio Phoenix server is running!");
});

// user route
app.get("/users", async (_req, res) => {
	try {
		const { rows } = await pool.query(
			`SELECT key, email, role, created_at, updated_at
			FROM public.users
			ORDER BY created_at DESC`
		);
		res.json(rows);
	} catch (err) {
		console.error("DB error:", err.message);
		res.status(500).json({ error: "DB query failed" });
	}
});

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});
