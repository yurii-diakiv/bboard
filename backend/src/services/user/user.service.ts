import {
  UserByIdResponseDto,
  UserSignResponseDto,
  UserSignUpRequestDto,
  UserSignInRequestDto,
  UserResponseDto
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { User as UserEntity } from './user.entity';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage } from '~/common/enums/enums';
import {
  token as tokenServ,
  encrypt as encryptServ
} from '~/services/services';

type Constructor = {
  userRepository: typeof userRep;
  encryptService: typeof encryptServ;
  tokenService: typeof tokenServ;
};

class User {
  #userRepository: typeof userRep;
  #encryptService: typeof encryptServ;
  #tokenService: typeof tokenServ;

  constructor({
    userRepository,
    encryptService,
    tokenService
  }: Constructor) {
    this.#userRepository = userRepository;
    this.#encryptService = encryptService;
    this.#tokenService = tokenService;
  }

  public async getById(
    id: string,
  ): Promise<UserByIdResponseDto | null> {
    const user = await this.#userRepository.getById(id);

    if (!user) {
      return null;
    }

    return user;
  }

  public async login(id: string): Promise<UserSignResponseDto> {
    const { email, name } = (await this.#userRepository.getById(id)) as UserEntity;
    return {
      user: {
        email,
        name,
        id
      },
      token: this.#tokenService.create({
        userId: id
      })
    };
  }

  public async create({
    email,
    name,
    surname,
    password,
    phone
  }: UserSignUpRequestDto): Promise<UserSignResponseDto> {
    const userByEmail = await this.#userRepository.getByEmail(email);

    if (userByEmail) {
      throw new InvalidCredentialsError();
    }

    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );

    const user = UserEntity.createNew({
      name,
      surname,
      email,
      phone,
      passwordHash,
      passwordSalt,
    });

    const { id } = await this.#userRepository.create(user);

    return this.login(id);
  }

  public async verifyLoginCredentials(
    verifyUserDto: UserSignInRequestDto,
  ): Promise<UserSignResponseDto> {
    const user = await this.#userRepository.getByEmail(verifyUserDto.email);

    if (!user) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_EMAIL,
      });
    }

    const isEqualPassword = await this.#encryptService.compare(
      verifyUserDto.password,
      user.passwordSalt,
      user.passwordHash,
    );

    if (!isEqualPassword) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_CREDENTIALS,
      });
    }

    return this.login(user.id);
  }

  public async getUsers(): Promise<UserResponseDto[] | null> {
    const users = await this.#userRepository.getAll();

    return users;
  }
}

export { User };
