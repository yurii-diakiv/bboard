import { getRandomId } from '~/helpers/helpers';

class User {
  public id: string;
  public name: string;
  public surname: string;
  public email: string;
  public phone: string;
  public passwordHash: string;
  public passwordSalt: string;

  private constructor({
    id,
    name,
    surname,
    email,
    phone,
    passwordHash,
    passwordSalt
  }: {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    passwordHash: string;
    passwordSalt: string;
  }) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
  }

  public static initialize({
    id,
    name,
    surname,
    email,
    phone,
    passwordHash,
    passwordSalt
  }: {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    passwordHash: string;
    passwordSalt: string;
  }): User {
    return new User({
      id,
      name,
      surname,
      email,
      phone,
      passwordHash,
      passwordSalt
    });
  }

  public static createNew({
    name,
    surname,
    email,
    phone,
    passwordHash,
    passwordSalt,
  }: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    passwordHash: string;
    passwordSalt: string;
  }): User {
    return new User({
      id: getRandomId(),
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
