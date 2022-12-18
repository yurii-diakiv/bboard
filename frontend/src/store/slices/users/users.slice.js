import { createSlice } from '@reduxjs/toolkit';
import { userApi, notification as notificationService } from 'services';
import { HttpError } from 'exceptions';
import { ReducerName } from 'common/enums';

const initialState = {
    users: []
};

const { reducer, actions } = createSlice({
    name: ReducerName.USERS,
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

const getUsers = () => async (dispatch) => {
    try {
        const users = await userApi.getUsers();
        dispatch(actions.setUsers(users));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const UsersActionCreator = {
    ...actions,
    getUsers
};

export { UsersActionCreator, reducer };
