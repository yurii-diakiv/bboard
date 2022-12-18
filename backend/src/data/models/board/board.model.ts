import { Model, RelationMappings } from 'objection';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { Column, User } from '../models';
import { BoardTableField } from './board-table-field.enum';

class Board extends AbstractModel {
  [BoardTableField.NAME]: string;
  [BoardTableField.USER_ID]: string;

  static get tableName(): string {
    return TableName.BOARDS;
  }

  static get relationMappings(): RelationMappings {
    return {
      columns: {
        relation: Model.HasManyRelation,
        modelClass: Column,
        join: {
          from: `${TableName.BOARDS}.id`,
          to: `${TableName.COLUMNS}.boardId`,
        },
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: `${TableName.BOARDS}.id`,
          through: {
            from: `${TableName.USERS_BOARDS}.boardId`,
            to: `${TableName.USERS_BOARDS}.userId`
          },
          to: `${TableName.USERS}.id`
        }
      }
    };
  }
}

export { Board };
