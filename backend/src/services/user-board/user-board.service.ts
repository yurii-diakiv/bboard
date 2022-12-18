import {
  UserBoardCreateRequestDto,
  UserResponseDto
} from '~/common/types/types';
import { userBoard as userBoardRep, user as userRep } from '~/data/repositories/repositories';
import { UserBoard as UserBoardEntity } from './user-board.entity';

type Constructor = {
  userBoardRepository: typeof userBoardRep;
  userRepository: typeof userRep;
};

class UserBoard {
  #userBoardRepository: typeof userBoardRep;
  #userRepository: typeof userRep;

  constructor({
    userBoardRepository,
    userRepository
  }: Constructor) {
    this.#userBoardRepository = userBoardRepository;
    this.#userRepository = userRepository;
  }

  public async create({
    userId,
    boardId
  }: UserBoardCreateRequestDto): Promise<UserResponseDto | null> {
    const userBoard = UserBoardEntity.createNew({
      userId,
      boardId
    });

    const createdMember = await this.#userBoardRepository.create(userBoard);
    const memeber = await this.#userRepository.getById(createdMember.userId);

    return memeber;
  }
}

export { UserBoard };
