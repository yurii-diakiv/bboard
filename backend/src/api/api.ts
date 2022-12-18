import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import {
  auth,
  user,
  board,
  column,
  card,
  userBoard
} from '~/services/services';
import { WHITE_ROUTES } from '~/common/constants/constants';
import { authorization as authorizationPlugin } from '~/plugins/plugins';
import { initAuthApi } from './auth/auth.api';
import { initBoardApi } from './board/board.api';
import { initColumnApi } from './column/column.api';
import { initCardApi } from './card/card.api';
import { initUserApi } from './user/user.api';
import { initUserBoardApi } from './user-board/user-board.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(authorizationPlugin, {
    services: {
      auth,
    },
    whiteRoutes: WHITE_ROUTES,
  });

  fastify.register(initAuthApi, {
    services: {
      user,
      auth,
    },
    prefix: ApiPath.AUTH,
  });

  fastify.register(initBoardApi, {
    services: {
      board
    },
    prefix: ApiPath.BOARDS,
  });

  fastify.register(initUserBoardApi, {
    services: {
      userBoard
    },
    prefix: ApiPath.USERS_BOARDS,
  });

  fastify.register(initUserApi, {
    services: {
      user,
    },
    prefix: ApiPath.USERS,
  });

  fastify.register(initColumnApi, {
    services: {
      column
    },
    prefix: ApiPath.COLUMNS,
  });

  fastify.register(initCardApi, {
    services: {
      card
    },
    prefix: ApiPath.CARDS,
  });
};

export { initApi };
