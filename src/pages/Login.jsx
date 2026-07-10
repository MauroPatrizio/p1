import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		if (email === "mauro@test.com" && password === "123456") {
			onLogin();
			navigate("/home", { replace: true });
		}
	};

	return (
		<div
			style={{
				maxWidth: "400px",
				margin: "3rem auto",
				padding: "2rem",
				borderRadius: "12px",
				boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
			}}
		>
			<h2>Iniciar sesión</h2>
			<p>Usa el usuario mauro@test.com y la contraseña 123456.</p>
			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
			>
				<input
					type="email"
					placeholder="Correo"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc" }}
				/>
				<input
					type="password"
					placeholder="Contraseña"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc" }}
				/>
				<button
					type="submit"
					style={{
						padding: "0.75rem",
						borderRadius: "8px",
						border: "none",
						backgroundColor: "#2563eb",
						color: "white",
						cursor: "pointer",
					}}
				>
					Entrar
				</button>
			</form>
		</div>
	);
}

export default Login;
