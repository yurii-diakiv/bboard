import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    authApi,
    storage
} from 'services';

const initialState = {
    user: null,
    dataStatus: 'idle',
};

const login = createAsyncThunk(
    'auth/login',
    async userData => {
        try {
            const { token, user } = await authApi.loginUser(userData);
            storage.setItem('token', token);

            return user;
        } catch (error) {
            throw error;
        }
    },
);

const registration = createAsyncThunk(
    'auth/registration',
    async userData => {
        try {
            const { token, user } = await authApi.registrationUser(userData);
            storage.setItem('token', token);

            return user;
        } catch (error) {
            throw error;
        }
    },
);

const { reducer, actions } = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        const sharedReducer = (state, { payload }) => {
            state.user = { user: payload };
        };
        builder
            .addCase(login.fulfilled, sharedReducer)
            .addCase(registration.fulfilled, sharedReducer);
    },
});

const logout = () => async (dispatch) => {
    storage.removeItem('token');
    dispatch(actions.removeUser());
};

const getCurrentUser = () => async (dispatch) => {
    try {
        const currentUser = await authApi.getCurrentUser();
        dispatch(actions.setUser(currentUser));
    } catch (error) {
        throw error;
    }
};

const AuthActionCreator = {
    ...actions,
    login,
    registration,
    logout,
    getCurrentUser,
};

export { AuthActionCreator, reducer };
