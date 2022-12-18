import { configureStore } from '@reduxjs/toolkit';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { ReducerName } from 'common/enums';
import { columnsReducer, authReducer, boardReducer, userReducer } from './slices';

const store = configureStore({
    reducer: {
        [ReducerName.COLUMNS]: columnsReducer,
        [ReducerName.TOASTR]: toastrReducer,
        [ReducerName.AUTH]: authReducer,
        [ReducerName.BOARDS]: boardReducer,
        [ReducerName.USERS]: userReducer
    }
});

export { store };
