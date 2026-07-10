import express from "express";
import process from "node:process";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "API funcionando", status: "ok" });
});

app.get("/api/health", (req, res) => {
	res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.post("/api/login", (req, res) => {
	const { email, password } = req.body;

	if (email === "mauro@test.com" && password === "123456") {
		return res.json({ success: true, message: "Login correcto" });
	}

	return res.status(401).json({ success: false, message: "Credenciales inválidas" });
});

app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
