import UserSelect from '../UserSelect/UserSelect';
import styles from './Header.module.css';
function Header() {
	return (
		<>
			<img className={styles.logo} src='/public/logo.svg' alt='Логотип'/>
			<UserSelect/>
		</>
	);
}

export default Header;