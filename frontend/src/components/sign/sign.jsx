import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SignUpForm, SignInForm } from './components';

import styles from './styles.module.scss';
const Sign = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const getScreen = path => {
        switch (path) {
            case '/sign-up': {
                return <SignUpForm />;
            }
            case '/sign-in': {
                return <SignInForm />;
            }
        }

        return null;
    };

    const { user } = useSelector(({ auth }) => ({
        user: auth.user,
    }));
    const hasUser = Boolean(user);

    useEffect(() => {
        if (hasUser) {
            navigate('/');
        }
    }, [hasUser]);

    return (
        <div className={styles.container}>
            <div className={styles.container__content}>
                {getScreen(pathname)}
            </div>
        </div>
    );
};

export default Sign;
