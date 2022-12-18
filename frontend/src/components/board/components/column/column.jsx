import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { TextInput, Button } from 'components/common';
import { ColumnsActionCreator, CardsActionCreator } from 'store/slices';
import { Card } from '..';

import styles from './column.module.scss';
import { useDrop } from 'react-dnd';

const Column = ({ column, columnIndex }) => {
    const dispatch = useDispatch();

    const handleColumnNameChange = id => e => dispatch(ColumnsActionCreator.updateColumn(id, { name: e.target.value }));
    const handleRemoveColumn = id => () => dispatch(ColumnsActionCreator.removeColumn(id));
    const handleAddCard = columnId => () => dispatch(CardsActionCreator.addCard({ title: '', text: '', columnId, assigneeId: null }));
    const handleChangeColumn = card => dispatch(CardsActionCreator.updateCard(card.id, { columnId: column.id }, card.columnId));

    const [{ canDrop }, drop] = useDrop(
        () => ({
            accept: 'card',
            drop: handleChangeColumn,
            canDrop: card => card.columnId !== column.id,
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        }),
        []
    );

    return (
        <div>
            <div className={styles.column}>
                <div className={clsx(styles.inlineBlock, styles.header)}>
                    <div className={styles.text}>
                        <TextInput
                            placeholder='Column name'
                            type='text'
                            color='gray-light'
                            defaultValue={column.name}
                            onBlur={handleColumnNameChange(column.id)}
                        />
                    </div>
                    <Button
                        label={<FontAwesomeIcon icon={faTrashAlt} />}
                        type='button'
                        color='gray-light'
                        isDisabled={Boolean(column.cards?.length)}
                        round
                        onClick={handleRemoveColumn(column.id)}
                    />
                </div>
                <div ref={drop} className={clsx(styles.cardsContainer, canDrop && styles.cardsContainerDrop)}>
                    {column.cards?.map(card => <Card key={card.id} card={card} columnIndex={columnIndex} />)}
                </div>
                <div className={styles.columnFooter}>
                    <Button
                        label='Add a new card'
                        type='button'
                        color='gray-light'
                        onClick={handleAddCard(column.id)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Column;
