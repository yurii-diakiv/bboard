type CardCreateRequestDto = {
  title: string;
  text: string;
  columnId: string;
  assigneeId: string;
};

type CardResponseDto = {
  id: string;
  title: string;
  text: string;
  columnId: string;
  assigneeId: string;
};

type CardUpdateRequestDto = {
  text?: string;
  assigneeId?: string;
};

export {
  type CardCreateRequestDto,
  type CardResponseDto,
  type CardUpdateRequestDto
};
