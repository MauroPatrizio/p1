import styles from "./UserCard.module.css";

function UserCard({ user }) {
	return (
		<div className={styles.userCard}>
			<h2 className={styles.userName}>{user.name}</h2>

			<div className={styles.userInfo}>
				<p>
					<span className={styles.label}>Usuario:</span> {user.name}
				</p>
				<p>
					<span className={styles.label}>Email:</span> {user.email}
				</p>
				<p>
					<span className={styles.label}>Teléfono:</span> {user.phone}
				</p>
				<p>
					<span className={styles.label}>Ciudad:</span>{" "}
					{user.address?.city || "No disponible"}
				</p>
			</div>
		</div>
	);
}

export default UserCard;
