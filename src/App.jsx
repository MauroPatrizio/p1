import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

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
							<Home />
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
