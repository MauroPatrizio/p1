import express from "express";
import process from "node:process";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { dbConfig, ensureDatabaseAndTable } from "./config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(router);

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
