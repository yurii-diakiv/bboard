type BoardCreateRequestDto = {
  userId: string;
  name: string;
};

type BoardResponseDto = {
  id: string;
  name: string;
  userId: string;
};

type BoardGetByIdRequestDto = {
  id: string;
};

type BoardGetFilter = {
  userId: string;
};

export {
  type BoardCreateRequestDto,
  type BoardResponseDto,
  type BoardGetByIdRequestDto,
  type BoardGetFilter
};
