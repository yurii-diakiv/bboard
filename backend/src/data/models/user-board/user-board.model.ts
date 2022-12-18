import { Model } from 'objection';
import { TableName } from '~/common/enums/enums';
import { UserBoardTableField } from './user-board-table-field.enum';
import { getFormattedISODate } from '~/helpers/helpers';

class UserBoard extends Model {
  [UserBoardTableField.USER_ID]: string;
  [UserBoardTableField.BOARD_ID]: string;
  ['createdAt']: string;

  $beforeInsert(): void {
    const date = getFormattedISODate(new Date());
    this.createdAt = date;
  }

  static get tableName(): string {
    return TableName.USERS_BOARDS;
  }
}

export { UserBoard };
