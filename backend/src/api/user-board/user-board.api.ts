import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { userBoard as userBoardServ } from '~/services/services';
import { HttpCode, HttpMethod, UsersBoardsApiPath } from '~/common/enums/enums';
import { UserBoardCreateRequestDto } from '~/common/types/types';

type Options = {
  services: { userBoard: typeof userBoardServ };
};

const initUserBoardApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { userBoard: userBoardService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: UsersBoardsApiPath.ROOT,
    async handler(
      req: FastifyRequest<{ Body: UserBoardCreateRequestDto }>,
      rep: FastifyReply,
    ) {
      const member = await userBoardService.create(req.body);

      return rep.send(member).status(HttpCode.CREATED);
    }
  });
};

export { initUserBoardApi };
