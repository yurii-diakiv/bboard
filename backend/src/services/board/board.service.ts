import {
  BoardResponseDto,
  BoardCreateRequestDto,
  BoardGetFilter
} from '~/common/types/types';
import { board as boardRep } from '~/data/repositories/repositories';
import { userBoard as userBoardRep } from '~/data/repositories/repositories';
import { Board as BoardEntity } from './board.entity';
import { UserBoard as UserBoardEntity } from '../user-board/user-board.entity';

type Constructor = {
  boardRepository: typeof boardRep;
  userBoardRepository: typeof userBoardRep;
};

class Board {
  #boardRepository: typeof boardRep;
  #userBoardRepository: typeof userBoardRep;

  constructor({
    boardRepository,
    userBoardRepository
  }: Constructor) {
    this.#boardRepository = boardRepository;
    this.#userBoardRepository = userBoardRepository;
  }

  public async getById(
    id: string,
  ): Promise<BoardResponseDto | null> {
    const board = await this.#boardRepository.getById(id);

    if (!board) {
      return null;
    }

    return board;
  }

  public async getBoards(
    filter: BoardGetFilter
  ): Promise<BoardResponseDto[] | null> {
    const boards = await this.#boardRepository.getAll(filter);

    return boards;
  }

  public async create({
    name,
    userId
  }: BoardCreateRequestDto): Promise<BoardResponseDto | null> {
    const newBoard = BoardEntity.createNew({
      name,
      userId
    });

    const createdBoard = await this.#boardRepository.create(newBoard);

    const newUserBoard = UserBoardEntity.createNew({
      userId,
      boardId: createdBoard.id
    });

    await this.#userBoardRepository.create(newUserBoard);

    const board = await this.#boardRepository.getById(createdBoard.id);

    return board;
  }
}

export { Board };
