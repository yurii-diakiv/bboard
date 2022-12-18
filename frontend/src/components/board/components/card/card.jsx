import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'components/common';
import { CardsActionCreator } from 'store/slices';

import styles from './card.module.scss';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';

const Card = ({ card }) => {
    const [showAssigneeSelect, setShowAssigneeSelect] = useState(false);
    const dispatch = useDispatch();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        item: card,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const { currentBoard } = useSelector(({ boards }) => ({
        currentBoard: boards.currentBoard
    }));

    const handleCardTextChange = e => dispatch(CardsActionCreator.updateCard(card.id, { title: e.target.value }));
    const handleCardTitleChange = e => dispatch(CardsActionCreator.updateCard(card.id, { text: e.target.value }));
    const handleRemoveCard = () => dispatch(CardsActionCreator.removeCard(card.id, card.columnId));

    const handleAssigneeChange = assigneeId => () => {
        setShowAssigneeSelect();
        dispatch(CardsActionCreator.updateCard(card.id, { assigneeId }));
    };

    const handleShowAssigneeSelect = () => setShowAssigneeSelect(!showAssigneeSelect);

    return (
        <div ref={drag} className={clsx(styles.card, isDragging && styles.dragOpacity)}>
            <div className={styles.header}>
                <input
                    type='text'
                    placeholder='Title'
                    className={styles.title}
                    onBlur={handleCardTextChange}
                    defaultValue={card.title}
                />
                <div className={styles.actions}>
                    <Button
                        label={<FontAwesomeIcon icon={faTrashAlt} />}
                        type='button'
                        round
                        onClick={handleRemoveCard}
                    />
                    <Button
                        label={card.assignee ? `${card.assignee.name[0]}${card.assignee.surname[0]}` : '+'}
                        color={card.assignee && 'gray-light'}
                        type='button'
                        round
                        onClick={handleShowAssigneeSelect}
                    />
                    {showAssigneeSelect &&
                        <div className={styles.memberSelect}>
                            {currentBoard.users.filter(member => member.id !== card.assignee?.id).map(member =>
                                <div
                                    key={member.id}
                                    className={styles.option}
                                    onClick={handleAssigneeChange(member.id)}
                                >
                                    {`${member.name} ${member.surname}`}
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
            <textarea className={styles.text} defaultValue={card.text} onBlur={handleCardTitleChange} placeholder='Text' />
        </div>
    );
};

export default Card;
