import { Card as CardM } from '~/data/models/models';
import { Card as CardEntity } from '~/services/card/card.entity';
import { CardUpdateRequestDto } from '~/common/types/types';

type Constructor = {
  CardModel: typeof CardM;
};

class Card {
  #CardModel: typeof CardM;

  constructor({ CardModel }: Constructor) {
    this.#CardModel = CardModel;
  }

  async update(id: string, payload: CardUpdateRequestDto): Promise<CardEntity | null> {
    const card = await this.#CardModel.query().patchAndFetchById(id, payload).withGraphFetched('[assignee]');

    if (!card) {
      return null;
    }

    return card;
  }

  async create(card: CardEntity): Promise<CardM> {
    const { id, text, title, columnId, assigneeId } = card;

    return this.#CardModel.query().insert({ id, text, title, columnId, assigneeId });
  }

  public async delete(id: string): Promise<void> {
    await this.#CardModel.query().where({ id }).del();
  }
}

export { Card };
