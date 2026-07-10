import { createDbConnection, dbConfig } from "../config.js";

export async function loginController(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ success: false, message: "Email y contraseña son requeridos" });
	}

	try {
		const connection = await createDbConnection();

		try {
			await connection.query(`USE \`${dbConfig.database}\``);
			const [rows] = await connection.query(
				"SELECT id, user, password FROM users WHERE user = ? AND password = ?",
				[email, password],
			);

			if (rows.length > 0) {
				return res.json({ success: true, message: "Login correcto", user: rows[0] });
			}

			return res.status(401).json({ success: false, message: "Credenciales inválidas" });
		} finally {
			await connection.end();
		}
	} catch (error) {
		console.error("Error al validar login:", error);
		return res.status(500).json({ success: false, message: "Error del servidor" });
	}
}
