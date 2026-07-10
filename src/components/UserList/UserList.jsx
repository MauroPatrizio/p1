import UserCard from "../UserCard/UserCard";
import styles from "./UserList.module.css";

function UserList({ users }) {
	if (users.length === 0) {
		return (
			<div className={styles.emptyState}>
				<p>Haz clic en "Cargar Usuarios" para ver la lista</p>
			</div>
		);
	}

	return (
		<div className={styles.usersGrid}>
			{users.map((user) => (
				<UserCard
					key={user.id}
					user={user}
				/>
			))}
		</div>
	);
}

export default UserList;
