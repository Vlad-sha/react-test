import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import styles from'./UserSelect.module.css';

function UserSelect () {
	const {userId, setUserId} = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};

	return (
		<select className={styles['select']} name='user' id='user' value={userId} onChange={changeUser}>
			<option value='1'>Сережа</option>
			<option value='2'>Петя</option>
		</select>
	);
}

export default UserSelect;