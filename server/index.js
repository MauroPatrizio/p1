import express from "express";
import process from "node:process";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const dbConfig = {
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
};

async function ensureDatabaseAndTable() {
	const connection = await mysql.createConnection({
		host: dbConfig.host,
		port: dbConfig.port,
		user: dbConfig.user,
		password: dbConfig.password,
	});

	await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
	await connection.query(`USE \`${dbConfig.database}\``);
	await connection.query(`
		CREATE TABLE IF NOT EXISTS users (
			id INT AUTO_INCREMENT PRIMARY KEY,
			user VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
		)
	`);

	await connection.end();
}

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

async function startServer() {
	try {
		await ensureDatabaseAndTable();
		app.listen(PORT, () => {
			console.log(`Servidor escuchando en http://localhost:${PORT}`);
			console.log(`Base de datos lista: ${dbConfig.database}`);
		});
	} catch (error) {
		console.error("Error al inicializar la base de datos:", error);
		process.exit(1);
	}
}

startServer();
