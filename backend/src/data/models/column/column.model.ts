import { Model, RelationMappings } from 'objection';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { Card, User } from '../models';
import { ColumnTableField } from './column-table-field.enum';

class Column extends AbstractModel {
  [ColumnTableField.NAME]: string;
  [ColumnTableField.BOARD_ID]: string;

  static get tableName(): string {
    return TableName.COLUMNS;
  }

  static get relationMappings(): RelationMappings {
    return {
      cards: {
        relation: Model.HasManyRelation,
        modelClass: Card,
        join: {
          from: `${TableName.COLUMNS}.id`,
          to: `${TableName.CARDS}.columnId`,
        },
      }
    };
  }
}

export { Column };
