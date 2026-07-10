import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message }) {
	return (
		<div className={styles.errorContainer}>
			<h2 className={styles.errorTitle}>Ocurrió un error</h2>
			<p className={styles.errorMessage}>{message}</p>
			<p className={styles.errorHint}>Por favor intenta nuevamente</p>
		</div>
	);
}

export default ErrorMessage;
