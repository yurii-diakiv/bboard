import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Select } from 'components/common';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthActionCreator, BoardsActionCreator } from 'store/slices';
import styles from './header.module.scss';
import { useSelector, useDispatch } from 'react-redux';

const getBoardsOptions = boards => boards.map(board => ({ value: board.id, label: board.name }));

const Header = ({ handleShowBoardModal, handleShowMemberModal, currentBoard, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { boards } = useSelector(({ boards }) => ({
        boards: boards.boards,
    }));

    useEffect(() => {
        if (user) {
            dispatch(BoardsActionCreator.getBoards({ userId: user.id }));
        }
    }, [dispatch, user]);

    const boardsOptions = getBoardsOptions(boards);
    const selectedBoard = boardsOptions.find(option => option.value === currentBoard?.id);

    const handleLogOutClick = () => {
        dispatch(AuthActionCreator.logout());
    };

    const handleBoardChange = option => navigate(`/${option.value}`);

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <div className={styles.label}>BBoard</div>
                <div className={styles.addBoardBtn}>
                    <Button
                        label='Add Board'
                        color='grey'
                        onClick={handleShowBoardModal}
                    />
                </div>
                <div className={styles.boardSelect}>
                    <Select
                        options={boardsOptions}
                        onChange={handleBoardChange}
                        value={selectedBoard}
                    />
                </div>
                {currentBoard &&
                    <div className={styles.members}>
                        {currentBoard.users.map(member =>
                            <div key={member.id} className={styles.member}>
                                {`${member.name[0]}${member.surname[0]}`}
                            </div>
                        )}
                        <Button round label='+' onClick={handleShowMemberModal} />
                    </div>
                }
            </div>
            <div className={styles.userSection}>
                <div className={styles.userInfo}>{user?.name}</div>
                <Button
                    styleType='medium-round'
                    label={<FontAwesomeIcon icon={faRightFromBracket} size='lg' />}
                    onClick={handleLogOutClick}
                />
            </div>
        </div>
    );
};

export default Header;
