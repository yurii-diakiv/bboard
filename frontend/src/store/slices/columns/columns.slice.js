import { createSlice } from '@reduxjs/toolkit';
import { columnApi, notification as notificationService } from 'services';
import { HttpError } from 'exceptions';
import { ReducerName } from 'common/enums';

const initialState = {
    columns: []
};

const { reducer, actions } = createSlice({
    name: ReducerName.COLUMNS,
    initialState,
    reducers: {
        setColumns: (state, action) => {
            state.columns = action.payload;
        },
        addColumn: (state, action) => {
            const newColumn = action.payload;
            newColumn.cards = [];

            state.columns = [...state.columns, newColumn];
        },
        removeColumn: (state, action) => {
            state.columns = state.columns.filter(column => column.id !== action.payload);
        },
        updateColumn: (state, action) => {
            const column = action.payload;
            const columnIndex = state.columns.findIndex(c => c.id === column.id);
            const newColumns = state.columns;
            newColumns[columnIndex] = { ...column, cards: state.columns[columnIndex].cards };

            state.columns = newColumns;
        },
        addCard: (state, action) => {
            const card = action.payload;
            const columnIndex = state.columns.findIndex(column => column.id === card.columnId);

            const newColumns = state.columns;
            const newCards = [...newColumns[columnIndex].cards, card];
            newColumns[columnIndex].cards = newCards;

            state.columns = newColumns;
        },
        updateCard: (state, action) => {
            const { oldColumnId, card } = action.payload;

            const oldColumnIndex = state.columns.findIndex(column => column.id === (oldColumnId || card.columnId));
            const newColumnIndex = state.columns.findIndex(column => column.id === card.columnId);

            const newColumns = state.columns;
            const newCards = newColumns[oldColumnIndex].cards.filter(c => c.id !== card.id);

            newColumns[oldColumnIndex].cards = newCards;
            newColumns[newColumnIndex].cards = [...newColumns[newColumnIndex].cards, card].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

            state.columns = newColumns.sort();
        },
        removeCard: (state, action) => {
            const card = action.payload;
            const columnIndex = state.columns.findIndex(column => column.id === card.columnId);

            const newColumns = state.columns;
            const newCards = newColumns[columnIndex].cards.filter(c => c.id !== card.id);
            newColumns[columnIndex].cards = newCards;

            state.columns = newColumns;
        }
    }
});

const getColumns = filter => async (dispatch) => {
    try {
        const columns = await columnApi.getColumns(filter);
        dispatch(actions.setColumns(columns));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const addColumn = column => async (dispatch) => {
    try {
        const response = await columnApi.createColumn(column);
        dispatch(actions.addColumn(response));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const removeColumn = id => async dispatch => {
    try {
        await columnApi.removeColumn(id);
        dispatch(actions.removeColumn(id));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const updateColumn = (id, payload) => async dispatch => {
    try {
        const response = await columnApi.updateColumn(id, payload);
        dispatch(actions.updateColumn(response));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const ColumnsActionCreator = {
    ...actions,
    getColumns,
    addColumn,
    removeColumn,
    updateColumn
};

export { ColumnsActionCreator, reducer };
