import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Board, Sign } from './components';
import { AuthActionCreator } from 'store/slices';
import { storage } from 'services';
import './index.module.scss';

const App = () => {
    const { user } = useSelector(({ auth }) => ({
        user: auth.user,
    }));

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const hasToken = Boolean(storage.getItem('token'));

    useEffect(() => {
        if (hasToken) {
            dispatch(AuthActionCreator.getCurrentUser());
        }
    }, []);

    useEffect(() => {
        if (!user && !hasToken) {
            navigate('/sign-in');
        }
    }, [user]);

    if (!user && hasToken) {
        return <></>;
    }

    return (
        <Routes >
            <Route path='/' element={<Board />} />
            <Route path='/sign-in' element={<Sign />} />
            <Route path='/sign-up' element={<Sign />} />
            <Route path="/:boardId" exact element={<Board />} />
        </Routes >
    );
};

export default App;
