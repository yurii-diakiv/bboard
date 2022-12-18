import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { board as boardServ } from '~/services/services';
import { HttpCode, HttpMethod, BoardsApiPath } from '~/common/enums/enums';
import { BoardCreateRequestDto, BoardGetByIdRequestDto, BoardGetFilter } from '~/common/types/types';

type Options = {
  services: { board: typeof boardServ };
};

const initBoardApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { board: boardService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: BoardsApiPath.$ID,
    async handler(
      req: FastifyRequest<{ Params: BoardGetByIdRequestDto }>,
      rep: FastifyReply
    ) {
      const board = await boardService.getById(req.params.id);

      return rep.send(board).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: BoardsApiPath.ROOT,
    async handler(
      req: FastifyRequest<{ Querystring: BoardGetFilter }>,
      rep: FastifyReply
    ) {
      const boards = await boardService.getBoards(req.query);

      return rep.send(boards).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: BoardsApiPath.ROOT,
    async handler(
      req: FastifyRequest<{ Body: BoardCreateRequestDto }>,
      rep: FastifyReply,
    ) {
      const board = await boardService.create(req.body);

      return rep.send(board).status(HttpCode.CREATED);
    }
  });
};

export { initBoardApi };
