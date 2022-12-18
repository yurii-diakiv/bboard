import clsx from 'clsx';

import styles from './styles.module.scss';

const Button = ({ type, styleType, label, onClick, color, round, iconBtn, isDisabled }) => (
    <button
        className={clsx(styles.btn, styles[styleType], styles[color], iconBtn && styles.iconBtn, round && styles.round)}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
    >
        {label}
    </button>
);

export default Button;
