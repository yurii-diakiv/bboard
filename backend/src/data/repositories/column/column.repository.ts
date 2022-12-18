import { Column as ColumnM } from '~/data/models/models';
import { Column as ColumnEntity } from '~/services/column/column.entity';
import { ColumnGetFilter, ColumnUpdateRequestDto } from '~/common/types/types';

type Constructor = {
  ColumnModel: typeof ColumnM;
};

class Column {
  #ColumnModel: typeof ColumnM;

  constructor({ ColumnModel }: Constructor) {
    this.#ColumnModel = ColumnModel;
  }

  async getAll(filter: ColumnGetFilter): Promise<ColumnEntity[]> {
    const columns = await this.#ColumnModel
      .query()
      .select()
      .where(filter)
      .withGraphFetched('[cards(orderByCreatedAt).[assignee]]')
      .orderBy('createdAt')
      .modifiers({
        orderByCreatedAt(builder) {
          builder.orderBy('createdAt');
        }
      });

    return columns;
  }

  async create(column: ColumnEntity): Promise<ColumnM> {
    const { id, name, boardId } = column;

    return this.#ColumnModel.query().insert({
      id,
      name,
      boardId
    });
  }

  public async delete(id: string): Promise<void> {
    await this.#ColumnModel.query().where({ id }).del();
  }

  async update(id: string, payload: ColumnUpdateRequestDto): Promise<ColumnEntity | null> {
    const column = await this.#ColumnModel
      .query()
      .patchAndFetchById(id, payload);

    if (!column) {
      return null;
    }

    return column;
  }
}

export { Column };
