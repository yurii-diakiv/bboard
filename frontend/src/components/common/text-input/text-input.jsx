import clsx from 'clsx';
import { ErrorMessage } from '@hookform/error-message';

import styles from '../common-styles.module.scss';

const TextInput = ({ type, label, placeholder, color, disabled, onChange, onBlur, defaultValue, value, name, field, errors, hasError }) => (
    <span className={styles.inputControl}>
        <label className={styles.label}>
            {label && <span className={clsx(styles.labelText)}>
                {label}
            </span>}
            <input
                type={type}
                placeholder={placeholder}
                className={clsx(styles.textInput, styles[color], hasError && styles.error)}
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
                defaultValue={defaultValue}
                value={value}
                {...field}
            />
        </label>
        {field && <ErrorMessage errors={errors} as="span" name={name} />}
    </span>
);

export default TextInput;
