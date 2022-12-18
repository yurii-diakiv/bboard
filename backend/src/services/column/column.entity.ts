import { getRandomId } from '~/helpers/helpers';

class Column {
  public id: string;
  public name: string;
  public boardId: string;

  private constructor({
    id,
    name,
    boardId
  }: {
    id: string;
    name: string;
    boardId: string;
  }) {
    this.id = id;
    this.name = name;
    this.boardId = boardId;
  }

  public static initialize({
    id,
    name,
    boardId
  }: {
    id: string;
    name: string;
    boardId: string;
  }): Column {
    return new Column({
      id,
      name,
      boardId
    });
  }

  public static createNew({
    name,
    boardId
  }: {
    name: string;
    boardId: string;
  }): Column {
    return new Column({
      id: getRandomId(),
      name,
      boardId
    });
  }
}

export { Column };
