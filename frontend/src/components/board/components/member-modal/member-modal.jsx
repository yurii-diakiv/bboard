import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UsersActionCreator, BoardsActionCreator } from 'store/slices';
import { Modal, Button, Select } from 'components/common';

import styles from './member-modal.module.scss';

const MemberModal = ({ handleShowMemberModal, isMemberModalShown, currentBoard }) => {
    const dispatch = useDispatch();

    const [memberId, setMemberId] = useState(null);

    const { users } = useSelector(({ users }) => ({
        users: users.users
    }));

    useEffect(() => {
        if (isMemberModalShown) {
            dispatch(UsersActionCreator.getUsers());
        }
    }, [dispatch, isMemberModalShown]);

    const memberOptions = users.map(user => ({ value: user.id, label: `${user.name} ${user.surname} - ${user.email}` }));

    const handleAddMember = () => {
        dispatch(BoardsActionCreator.addMember({ userId: memberId, boardId: currentBoard.id }));
        handleShowMemberModal();
    };

    const handleMemberSelect = option => setMemberId(option.value);

    return (
        <Modal isShow={isMemberModalShown}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Add Member</h3>
                    <button
                        className={styles.closeButton}
                        onClick={handleShowMemberModal}
                        type="button"
                    >
                        &#10060;
                    </button>
                </div>
                <Select
                    options={memberOptions}
                    onChange={handleMemberSelect}
                />
                <div className={styles.addBtn}>
                    <Button
                        label='Add Member'
                        color='green'
                        onClick={handleAddMember}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default MemberModal;
