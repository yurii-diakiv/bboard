import { User as UserM } from '~/data/models/models';
import { User as UserEntity } from '~/services/user/user.entity';

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.#UserModel
      .query()
      .select()
      .where({ email })
      .first();

    if (!user) {
      return null;
    }

    return user;
  }

  async getById(id: string): Promise<UserEntity | null> {
    const user = await this.#UserModel
      .query()
      .select()
      .where({ id })
      .first();

    if (!user) {
      return null;
    }

    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    const users = await this.#UserModel
      .query()
      .select('id', 'name', 'surname', 'email');

    return users;
  }

  async create(user: UserEntity): Promise<UserM> {
    const { id, name, surname, email, phone, passwordHash, passwordSalt } = user;

    return this.#UserModel.query().insert({
      id,
      name,
      surname,
      email,
      phone,
      passwordHash,
      passwordSalt
    });
  }
}

export { User };
