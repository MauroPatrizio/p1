import { useUsers } from "../hooks/useUsers";
import UserList from "../components/UserList/UserList";
import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styles from "./Home.module.css";

function Home() {
	const { users, loading, error, fetchUsers } = useUsers();

	return (
		<div className={styles.home}>
			<header className={styles.header}>
				<h1>Mi primera API con React</h1>
				<p>Este ejemplo obtiene usuarios desde una API pública utilizando React Hooks.</p>

				<button
					onClick={fetchUsers}
					disabled={loading}
					className={styles.button}
				>
					{loading ? "Cargando..." : "Cargar Usuarios"}
				</button>

				<p className={styles.counter}>Usuarios cargados: {users.length}</p>
			</header>

			<div className={styles.main}>
				{loading && <Spinner />}
				{error && <ErrorMessage message={error} />}
				{!loading && !error && <UserList users={users} />}
			</div>
		</div>
	);
}

export default Home;
