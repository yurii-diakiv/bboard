import ReactDatePicker from 'react-datepicker';
import clsx from 'clsx';

import styles from '../common-styles.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = ({ label, placeholder, field }) => (
    <span className={styles.inputControl}>
        <label className={styles.label}>
            <span className={clsx(styles.labelText)}>
                {label}
            </span>
            <ReactDatePicker
                selected={field?.value}
                dropdownMode="select"
                placeholderText={placeholder}
                className={clsx(styles.textInput)}
                {...field}
            />
        </label>
    </span>
);

export default DatePicker;
