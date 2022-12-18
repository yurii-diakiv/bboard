import { getRandomId } from '~/helpers/helpers';

class UserBoard {
  public userId: string;
  public boardId: string;

  private constructor({
    userId,
    boardId
  }: {
    userId: string;
    boardId: string;
  }) {
    this.userId = userId;
    this.boardId = boardId;
  }

  public static initialize({
    userId,
    boardId
  }: {
    userId: string;
    boardId: string;
  }): UserBoard {
    return new UserBoard({
      userId,
      boardId
    });
  }

  public static createNew({
    userId,
    boardId
  }: {
    userId: string;
    boardId: string;
  }): UserBoard {
    return new UserBoard({
      userId,
      boardId
    });
  }
}

export { UserBoard };
