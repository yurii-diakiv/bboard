import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import {
  TokenPayload,
  UserSignInRequestDto,
  UserSignResponseDto
} from '~/common/types/types';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import {
  user as userServ,
  token as tokenServ,
} from '~/services/services';

type Constructor = {
  userService: typeof userServ;
  tokenService: typeof tokenServ;
};

class Auth {
  #userService: typeof userServ;
  #tokenService: typeof tokenServ;

  constructor({ userService, tokenService }: Constructor) {
    this.#userService = userService;
    this.#tokenService = tokenService;
  }

  public async getUser(userDto: UserSignInRequestDto): Promise<UserSignResponseDto> {
    return this.#userService.verifyLoginCredentials(userDto);
  }

  public async getCurrentUser(
    token: string,
  ): Promise<UserSignResponseDto> {
    try {
      const { userId } = this.#tokenService.decode<TokenPayload>(token);

      return this.#userService.login(userId);
    } catch {
      throw new InvalidCredentialsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.INVALID_TOKEN,
      });
    }
  }
}

export { Auth };
