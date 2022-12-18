import { Model, RelationMappings } from 'objection';
import { TableName } from '~/common/enums/enums';
import { User } from '../models';
import { AbstractModel } from '../abstract/abstract.model';
import { CardTableField } from './card-table-field.enum';

class Card extends AbstractModel {
  [CardTableField.TEXT]: string;
  [CardTableField.TITLE]: string;
  [CardTableField.COLUMN_ID]: string;
  [CardTableField.ASSIGNEE_ID]: string;

  static get tableName(): string {
    return TableName.CARDS;
  }

  static get relationMappings(): RelationMappings {
    return {
      assignee: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${TableName.CARDS}.assigneeId`,
          to: `${TableName.USERS}.id`,
        },
      }
    };
  }
}

export { Card };
