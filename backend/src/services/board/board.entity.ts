import { getRandomId } from '~/helpers/helpers';

class Board {
  public id: string;
  public name: string;
  public userId: string;

  private constructor({
    id,
    name,
    userId
  }: {
    id: string;
    name: string;
    userId: string;
  }) {
    this.id = id;
    this.name = name;
    this.userId = userId;
  }

  public static initialize({
    id,
    name,
    userId
  }: {
    id: string;
    name: string;
    userId: string;
  }): Board {
    return new Board({
      id,
      name,
      userId
    });
  }

  public static createNew({
    name,
    userId
  }: {
    name: string;
    userId: string;
  }): Board {
    return new Board({
      id: getRandomId(),
      name,
      userId
    });
  }
}

export { Board };
