import ReactSelect from 'react-select';
import clsx from 'clsx';

import styles from '../common-styles.module.scss';

const customStyles = {
    menuPortal: provided => ({ ...provided, zIndex: 300 }),
    control: (provided) => ({
        ...provided,
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        boxShadow: 'none',
        border: 0,
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 7,
        zIndex: 200
    }),
    option: (provided, state) => ({
        ...provided,
        height: 40,
        fontSize: 14,
        color: '#424242',
        fontWeight: 'bold',
        ...(state.isSelected && { backgroundColor: '#f2f2f5' }),
        "&:hover": {
            backgroundColor: '#f7f7f7'
        }
    })
}

const Select = ({ options, label, defaultValue, onChange, value, field }) => (
    <span className={styles.inputControl}>
        <label className={styles.label}>
            {label && <span className={clsx(styles.labelText)}>
                {label}
            </span>}
            <ReactSelect
                defaultValue={defaultValue}
                options={options}
                styles={customStyles}
                onChange={onChange}
                menuPortalTarget={document.body}
                value={value}
                {...field}
            />
        </label>
    </span>
);

export default Select;
