import { useController } from 'react-hook-form';

const FormField = ({ component: Component, name, control, ...rest }) => {
    const { field, fieldState: { error } } = useController({ name, control });

    return <Component field={field} name={name} hasError={Boolean(error)} {...rest} />;
};

export default FormField;
