import dotenv from "dotenv";
import mysql from "mysql2/promise";
import process from "node:process";

dotenv.config();

export const dbConfig = {
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT || 3306),
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "root",
	database: process.env.DB_NAME || "pepehongo",
};

export async function createDbConnection() {
	return mysql.createConnection({
		host: dbConfig.host,
		port: dbConfig.port,
		user: dbConfig.user,
		password: dbConfig.password,
	});
}

export async function ensureDatabaseAndTable() {
	const connection = await createDbConnection();

	try {
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
	} finally {
		await connection.end();
	}
}
