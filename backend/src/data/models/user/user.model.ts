import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { UserTableField } from './user-table-field.enum';

class User extends AbstractModel {
  [UserTableField.NAME]: string;
  [UserTableField.SURNAME]: string;
  [UserTableField.EMAIL]: string;
  [UserTableField.PASSWORD_HASH]: string;
  [UserTableField.PASSWORD_SALT]: string;
  [UserTableField.PHONE]: string;

  static get tableName(): string {
    return TableName.USERS;
  }
}

export { User };
