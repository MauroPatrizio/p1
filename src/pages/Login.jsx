import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL_BACK = import.meta.env.VITE_API_URL;
console.log("la url es:", API_URL_BACK);
function Login({ onLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");

		try {
			const response = await fetch(`${API_URL_BACK}login1`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				onLogin();
				navigate("/home", { replace: true });
			} else {
				setError(data.message || "No se pudo iniciar sesión");
			}
		} catch (error) {
			setError("No se pudo conectar con el servidor");
			console.log(error);
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
			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
			>
				<input
					type="text"
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
				{error && <p style={{ color: "#dc2626", margin: 0 }}>{error}</p>}
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
