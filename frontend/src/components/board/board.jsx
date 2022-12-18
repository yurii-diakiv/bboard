import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TextInput, Button } from 'components/common';
import { Header } from 'components';
import { ColumnsActionCreator, BoardsActionCreator } from 'store/slices';
import { BoardModal, Column, MemberModal } from './components';

import styles from './board.module.scss';

const Board = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { currentBoard, columns, user } = useSelector(({ boards, columns, auth }) => ({
        currentBoard: boards.currentBoard,
        columns: columns.columns,
        user: auth.user?.user
    }));

    const [currentBoardId, setCurrentBoardId] = useState(null);
    const [columnName, setColumnName] = useState('');
    const [isBoardModalShown, setIsBoardModalShown] = useState(false);
    const [isMemberModalShown, setIsMemberModalShown] = useState(false);

    const boardId = params.boardId;

    useEffect(() => {
        if (currentBoard && currentBoard.id !== currentBoardId) {
            setCurrentBoardId(currentBoard.id);
            navigate(`/${currentBoard.id}`);
        }
    }, [navigate, currentBoard]);

    useEffect(() => {
        if (boardId) {
            setCurrentBoardId(boardId);
            dispatch(BoardsActionCreator.getCurrentBoard(boardId));
            dispatch(ColumnsActionCreator.getColumns({ boardId }));
        }
    }, [dispatch, boardId]);

    const handleShowBoardModal = () => setIsBoardModalShown(!isBoardModalShown);
    const handleShowMemberModal = () => setIsMemberModalShown(!isMemberModalShown);

    const handleNewColumnNameChange = e => setColumnName(e.target.value);

    const handleAddColumn = () => {
        setColumnName('');
        dispatch(ColumnsActionCreator.addColumn({ name: columnName, boardId: currentBoard.id }))
    };

    const handleAddBoard = boardName => {
        dispatch(BoardsActionCreator.addBoard({ userId: user.id, name: boardName }));
        handleShowBoardModal();
    };

    return (
        <>
            <Header handleShowBoardModal={handleShowBoardModal} handleShowMemberModal={handleShowMemberModal} currentBoard={currentBoard} user={user} />
            <div className={styles.container}>
                {columns.map((column, index) => <Column key={column.id} column={column} columnIndex={index} />)}
                {currentBoard &&
                    <div>
                        <div className={styles.newColumn}>
                            <div className={styles.inlineBlock}>
                                <TextInput
                                    placeholder='Add a new column'
                                    type='text'
                                    color='gray-very-light'
                                    value={columnName}
                                    onChange={handleNewColumnNameChange}
                                />
                                <Button
                                    label={<FontAwesomeIcon icon={faPlus} />}
                                    type='button'
                                    color='primary-light'
                                    iconBtn
                                    onClick={handleAddColumn}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
            <BoardModal handleShowBoardModal={handleShowBoardModal} isBoardModalShown={isBoardModalShown} addBoard={handleAddBoard} />
            <MemberModal handleShowMemberModal={handleShowMemberModal} isMemberModalShown={isMemberModalShown} currentBoard={currentBoard} />
        </>
    );
};

export default Board;
