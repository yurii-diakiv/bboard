import { useState } from 'react';
import { Modal, Button, TextInput } from 'components/common';

import styles from './board-modal.module.scss';

const BoardModal = ({ handleShowBoardModal, isBoardModalShown, addBoard }) => {
    const [boardName, setBoardName] = useState('');

    const handleNameInputChange = e => setBoardName(e.target.value);
    const handleAddBoard = () => addBoard(boardName);

    return (
        <Modal isShow={isBoardModalShown}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Add Board</h3>
                    <button
                        className={styles.closeButton}
                        onClick={handleShowBoardModal}
                        type="button"
                    >
                        &#10060;
                    </button>
                </div>
                <TextInput
                    label='Board name'
                    placeholder='Board name'
                    type='text'
                    color='gray-light'
                    onChange={handleNameInputChange}
                />
                <div className={styles.addBtn}>
                    <Button
                        label='Add Board'
                        color='green'
                        onClick={handleAddBoard}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default BoardModal;
