import { getRandomId } from '~/helpers/helpers';

class Card {
  public id: string;
  public text: string;
  public title: string;
  public columnId: string;
  public assigneeId: string;

  private constructor({
    id,
    text,
    title,
    columnId,
    assigneeId
  }: {
    id: string;
    text: string;
    title: string;
    columnId: string;
    assigneeId: string;
  }) {
    this.id = id;
    this.text = text;
    this.title = title;
    this.columnId = columnId;
    this.assigneeId = assigneeId;
  }

  public static initialize({
    id,
    text,
    title,
    columnId,
    assigneeId
  }: {
    id: string;
    text: string;
    title: string;
    columnId: string;
    assigneeId: string;
  }): Card {
    return new Card({
      id,
      text,
      title,
      columnId,
      assigneeId
    });
  }

  public static createNew({
    text,
    title,
    columnId,
    assigneeId
  }: {
    text: string;
    title: string;
    columnId: string;
    assigneeId: string;
  }): Card {
    return new Card({
      id: getRandomId(),
      text,
      title,
      columnId,
      assigneeId
    });
  }
}

export { Card };
