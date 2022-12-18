type UserByIdResponseDto = {
  id: string;
  email: string;
  name: string;
};

type UserSignResponseDto = {
  user: UserByIdResponseDto;
  token: string;
};

type UserSignUpRequestDto = {
  email: string;
  name: string;
  surname: string;
  password: string;
  phone: string;
};

type UserSignInRequestDto = {
  email: string;
  password: string;
};

type UserResponseDto = {
  id: string;
  email: string;
  name: string;
};

export {
  type UserByIdResponseDto,
  type UserSignResponseDto,
  type UserSignUpRequestDto,
  type UserSignInRequestDto,
  type UserResponseDto
};
