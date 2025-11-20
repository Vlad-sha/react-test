import { useContext, useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import styles from'./JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';



function JournalForm({onSubmit, data, onDelete }) {

	const [formState, dispatchForm] = useReducer(formReducer,INITIAL_STATE);
	const {isValid, isFormReady,values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const {userId} = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() =>{
		if (!data) {
			dispatchForm({type: 'CLEAR'});
			dispatchForm({type : 'SET_VALUE', payload : { userId }});
		}
		dispatchForm({type : 'SET_VALUE', payload : { ...data }});
	},[data]);

	useEffect(() => {
		let timerID;
		if (!isValid.date || !isValid.text || !isValid.title) {
			focusError(isValid);
			timerID = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerID);
		};
	}, [isValid]);

	useEffect (() => {
		if (isFormReady) {
			onSubmit(values);
			dispatchForm({type: 'CLEAR'});
			dispatchForm({type : 'SET_VALUE', payload : { userId }});
		}
	}, [isFormReady, values , onSubmit, userId]);

	useEffect(() => {
		dispatchForm({type : 'SET_VALUE', payload : { userId }});
	},[userId]);

	const onChange = (e) => {
		dispatchForm({type : 'SET_VALUE', payload : { [e.target.name]: e.target.value}});
	};

	const addPost = (event) => {
		event.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispatchForm({type: 'CLEAR'});
		dispatchForm({type : 'SET_VALUE', payload : { userId }});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addPost}>
			<div className={styles['form-row']}>
				<Input appearance='title' type='text' ref={titleRef} onChange={onChange} value={values.title} isValid={isValid.title} name='title' id='title'/>
				{data?.id &&<button className={styles['delete']} type='button' onClick={deleteJournalItem}>
					<img src='/archive.svg' alt='Иконка удаления' />
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label for="date" className={styles['form-label']}>
					<img src='/calendar.svg' alt='Иконка календаря'/>
					<span>Дата</span>
				</label>
				<Input type ='date' ref={dateRef} onChange={onChange} name='date' isValid={isValid.date} value={values.date ? new Date(values.date).toISOString().slice(0,10): ''} id='date'/>
			</div>
			<div className={styles['form-row']}>
				<label for="tag" className={styles['form-label']}>
					<img src='/folder.svg' alt='Иконка папки'/>
					<span>Метки</span>
				</label>
				<Input type='text' id='tag' value={values.tag} onChange={onChange} name='tag'/>
			</div>
			
			<textarea name="text" value={values.text} onChange={onChange} ref={textRef} id=""  className={cn(styles['input'], {
				[styles['invalid']] : !isValid.text
			})}></textarea>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;