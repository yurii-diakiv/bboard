import { createSlice } from '@reduxjs/toolkit';
import { boardApi, userBoardApi, notification as notificationService } from 'services';
import { HttpError } from 'exceptions';
import { ReducerName } from 'common/enums';
import { ColumnsActionCreator } from '../';

const initialState = {
    currentBoard: null,
    boards: []
};

const { reducer, actions } = createSlice({
    name: ReducerName.BOARDS,
    initialState,
    reducers: {
        setBoards: (state, action) => {
            state.boards = action.payload;
        },
        setBoard: (state, action) => {
            state.boards = [...state.boards, action.payload];
        },
        setCurrentBoard: (state, action) => {
            state.currentBoard = action.payload;
        },
        addMember: (state, action) => {
            // const card = action.payload;
            // const columnIndex = state.columns.findIndex(column => column.id === card.columnId);

            // const newColumns = state.columns;
            // const newCards = [...newColumns[columnIndex].cards, card];
            // newColumns[columnIndex].cards = newCards;

            // state.columns = newColumns;

            const member = action.payload;
            const newMembers = [...state.currentBoard.users, member];

            state.currentBoard.users = newMembers;
        },
    },
});

const getBoards = filter => async (dispatch) => {
    try {
        const boards = await boardApi.getBoards(filter);
        dispatch(actions.setBoards(boards));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const getCurrentBoard = id => async (dispatch) => {
    try {
        dispatch(ColumnsActionCreator.setColumns([]));
        const board = await boardApi.getBoard(id);
        dispatch(actions.setCurrentBoard(board));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const addBoard = board => async (dispatch) => {
    try {
        const response = await boardApi.createBoard(board);
        dispatch(actions.setBoard(response));
        dispatch(actions.setCurrentBoard(response));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const addMember = member => async (dispatch) => {
    try {
        const response = await userBoardApi.createUserBoard(member);
        dispatch(actions.addMember(response));
    } catch (error) {
        if (error instanceof HttpError) {
            return notificationService.error(`Error ${error.status}`, error.messages);
        }
        throw error;
    }
};

const BoardsActionCreator = {
    ...actions,
    addBoard,
    getBoards,
    getCurrentBoard,
    addMember
};

export { BoardsActionCreator, reducer };
