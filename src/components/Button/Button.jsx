import './Button.css';

function Button({children, onClick}) {
	return (
		<button onClick={onClick} className='button accent'>{children}</button>
	);
}

export default Button;
