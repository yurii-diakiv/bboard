import { createSlice } from '@reduxjs/toolkit';
import { cardApi, notification as notificationService } from 'services';
import { HttpError } from 'exceptions';
import { ReducerName } from 'common/enums';
import { ColumnsActionCreator } from '../';

const initialState = {};

const { reducer, actions } = createSlice({
    name: ReducerName.CARDS,
    initialState,
    reducers: {}
});

const addCard = card => async (dispatch) => {
    try {
        const response = await cardApi.createCard(card);
        dispatch(ColumnsActionCreator.addCard(response));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const updateCard = (id, payload, oldColumnId) => async dispatch => {
    try {
        const response = await cardApi.updateCard(id, payload);
        dispatch(ColumnsActionCreator.updateCard({ card: response, oldColumnId }));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const removeCard = (id, columnId) => async dispatch => {
    try {
        await cardApi.removeCard(id);
        dispatch(ColumnsActionCreator.removeCard({ id, columnId }));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const CardsActionCreator = { ...actions, addCard, updateCard, removeCard };

export { CardsActionCreator, reducer };
