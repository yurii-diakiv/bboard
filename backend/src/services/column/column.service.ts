import {
  ColumnResponseDto,
  ColumnCreateRequestDto,
  ColumnGetFilter,
  ColumnUpdateRequestDto
} from '~/common/types/types';
import { column as columnRep } from '~/data/repositories/repositories';
import { Column as ColumnEntity } from './column.entity';

type Constructor = {
  columnRepository: typeof columnRep;
};

class Column {
  #columnRepository: typeof columnRep;

  constructor({
    columnRepository
  }: Constructor) {
    this.#columnRepository = columnRepository;
  }

  public async getColumns(
    filter: ColumnGetFilter
  ): Promise<ColumnResponseDto[] | null> {
    const columns = await this.#columnRepository.getAll(filter);

    return columns;
  }

  public async create({
    name,
    boardId
  }: ColumnCreateRequestDto): Promise<ColumnResponseDto> {
    const column = ColumnEntity.createNew({
      name,
      boardId
    });

    const createdColumn = await this.#columnRepository.create(column);

    return createdColumn;
  }

  public async delete(id: string): Promise<void> {
    await this.#columnRepository.delete(id);
  }

  public async updateById(id: string, payload: ColumnUpdateRequestDto): Promise<ColumnResponseDto | null> {
    return await this.#columnRepository.update(id, payload);
  }
}

export { Column };
