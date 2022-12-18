import {
  User as UserModel,
  Board as BoardModel,
  Column as ColumnModel,
  Card as CardModel,
  UserBoard as UserBoardModel
} from '~/data/models/models';

import { User } from './user/user.repository';
import { Board } from './board/board.repository';
import { Column } from './column/column.repository';
import { Card } from './card/card.repository';
import { UserBoard } from './user-board/board.repository';

const user = new User({
  UserModel
});

const board = new Board({
  BoardModel
});

const column = new Column({
  ColumnModel
});

const card = new Card({
  CardModel
});

const userBoard = new UserBoard({
  UserBoardModel
});

export {
  user,
  board,
  column,
  card,
  userBoard
};
