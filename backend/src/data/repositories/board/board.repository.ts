import { Board as BoardM } from '~/data/models/models';
import { Board as BoardEntity } from '~/services/board/board.entity';
import { BoardGetFilter } from '~/common/types/types';

type Constructor = {
  BoardModel: typeof BoardM;
};

class Board {
  #BoardModel: typeof BoardM;

  constructor({ BoardModel }: Constructor) {
    this.#BoardModel = BoardModel;
  }

  async getById(id: string): Promise<BoardEntity | null> {
    const board = await this.#BoardModel
      .query()
      .select('id', 'name', 'userId')
      .withGraphFetched('[users]')
      .where({ id })
      .first();

    if (!board) {
      return null;
    }

    return board;
  }

  async getAll(filter: BoardGetFilter): Promise<BoardEntity[]> {
    const { userId } = filter;

    const boards = await this.#BoardModel
      .query()
      .select()
      .joinRelated('users')
      .withGraphFetched('[columns]')
      .where('users.id', userId)

    return boards;
  }

  async create(board: BoardEntity): Promise<BoardM> {
    const { id, name, userId } = board;

    return this.#BoardModel.query().insert({
      id,
      name,
      userId
    }).withGraphFetched('[users]');
  }
}

export { Board };
