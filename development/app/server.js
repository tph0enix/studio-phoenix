import express from "express";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config({ path: '../.env' });

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
})

app.get("/", (_req, res) => {
	res.set("Cache-Control", "no-store");
	res.send("Studio Phoenix server is running!");
});

// quick DB test route
app.get("/db-time", async (_req, res) => {
	try {
		const { rows } = await pool.query("SELECT NOW() AS now");
		res.json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "DB query failed" });
	}
});

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});
