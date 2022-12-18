import {
  CardResponseDto,
  CardCreateRequestDto,
  CardUpdateRequestDto
} from '~/common/types/types';
import { card as cardRep } from '~/data/repositories/repositories';
import { Card as CardEntity } from './card.entity';

type Constructor = {
  cardRepository: typeof cardRep;
};

class Card {
  #cardRepository: typeof cardRep;

  constructor({ cardRepository }: Constructor) {
    this.#cardRepository = cardRepository;
  }

  public async updateById(id: string, payload: CardUpdateRequestDto): Promise<CardResponseDto | null> {
    const card = await this.#cardRepository.update(id, payload);

    return card;
  }

  public async create({ text, title, columnId, assigneeId }: CardCreateRequestDto): Promise<CardResponseDto> {
    const card = CardEntity.createNew({ text, title, columnId, assigneeId });

    const createdCard = await this.#cardRepository.create(card);

    return createdCard;
  }

  public async delete(id: string): Promise<void> {
    await this.#cardRepository.delete(id);
  }
}

export { Card };
