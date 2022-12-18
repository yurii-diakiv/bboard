import { UserBoard as UserBoardM } from '~/data/models/models';
import { UserBoard as UserBoardEntity } from '~/services/user-board/user-board.entity';

type Constructor = {
  UserBoardModel: typeof UserBoardM;
};

class UserBoard {
  #UserBoardModel: typeof UserBoardM;

  constructor({ UserBoardModel }: Constructor) {
    this.#UserBoardModel = UserBoardModel;
  }

  async create(userBoard: UserBoardEntity): Promise<UserBoardM> {
    const { userId, boardId } = userBoard;

    return this.#UserBoardModel.query().insert({
      userId,
      boardId
    });
  }
}

export { UserBoard };
