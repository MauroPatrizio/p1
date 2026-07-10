import { useState } from "react";

const API_URL = import.meta.env.VITE_API;

export const useUsers = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchUsers = async () => {
		setLoading(true);
		setError(null);
		setUsers([]);

		try {
			const response = await fetch(API_URL);

			if (!response.ok) {
				throw new Error(`Error HTTP: ${response.status}`);
			}

			const data = await response.json();
			setUsers(data);
		} catch (error) {
			setError(error.message);
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	};

	return { users, loading, error, fetchUsers };
};
