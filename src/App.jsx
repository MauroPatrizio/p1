import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

async function logoutUser() {
	await fetch("http://localhost:4000/api/logout", {
		method: "POST",
		credentials: "include",
	});
}

function ProtectedRoute({ isAuthenticated, children }) {
	if (!isAuthenticated) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return children;
}

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLogout = async () => {
		await logoutUser();
		setIsAuthenticated(false);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/login"
					element={<Login onLogin={() => setIsAuthenticated(true)} />}
				/>
				<Route
					path="/home"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<Home onLogout={handleLogout} />
						</ProtectedRoute>
					}
				/>
				<Route
					path="*"
					element={
						<Navigate
							to="/login"
							replace
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
