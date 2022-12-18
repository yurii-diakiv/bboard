type ColumnCreateRequestDto = {
  name: string;
  boardId: string;
};

type ColumnResponseDto = {
  id: string;
  name: string;
  boardId: string;
};

type ColumnGetFilter = {
  boardId: string;
};

type ColumnUpdateRequestDto = {
  name: string;
};

export {
  type ColumnCreateRequestDto,
  type ColumnResponseDto,
  type ColumnGetFilter,
  type ColumnUpdateRequestDto
};
