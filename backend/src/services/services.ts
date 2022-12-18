import {
  user as userRepository,
  board as boardRepository,
  column as columnRepository,
  card as cardRepository,
  userBoard as userBoardRepository
} from '~/data/repositories/repositories';

import { User } from './user/user.service';
import { Board } from './board/board.service';
import { UserBoard } from './user-board/user-board.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
import { Auth } from './auth/auth.service';
import { Column } from './column/column.service';
import { Card } from './card/card.service';

const token = new Token();

const encrypt = new Encrypt({
  salt: 10,
});

const user = new User({
  userRepository,
  encryptService: encrypt,
  tokenService: token
});

const board = new Board({
  boardRepository,
  userBoardRepository
});

const userBoard = new UserBoard({
  userBoardRepository,
  userRepository
});

const auth = new Auth({
  userService: user,
  tokenService: token
});

const column = new Column({
  columnRepository
});

const card = new Card({
  cardRepository
});

export {
  encrypt,
  token,
  auth,
  user,
  board,
  column,
  card,
  userBoard
};
