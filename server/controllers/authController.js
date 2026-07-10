export function loginController(req, res) {
	const { email, password } = req.body;

	if (email === "mauro@test.com" && password === "123456") {
		return res.json({ success: true, message: "Login correcto" });
	}

	return res.status(401).json({ success: false, message: "Credenciales inválidas" });
}
