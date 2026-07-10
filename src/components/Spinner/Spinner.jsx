import styles from "./Spinner.module.css";

function Spinner() {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.spinner}></div>
			<p className={styles.loadingText}>Cargando usuarios...</p>
		</div>
	);
}

export default Spinner;
