import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { card as cardServ } from '~/services/services';
import { HttpCode, HttpMethod, CardsApiPath } from '~/common/enums/enums';
import { UpdateRequestParamsDto, CardCreateRequestDto, CardUpdateRequestDto, DeleteRequestParamsDto } from '~/common/types/types';

type Options = {
  services: { card: typeof cardServ };
};

const initCardApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { card: cardService } = opts.services;

  fastify.route({
    method: HttpMethod.POST, url: CardsApiPath.ROOT,
    async handler(req: FastifyRequest<{ Body: CardCreateRequestDto }>, rep: FastifyReply,) {
      const card = await cardService.create(req.body);

      return rep.send(card).status(HttpCode.CREATED);
    }
  });

  fastify.route({
    method: HttpMethod.PUT, url: CardsApiPath.$ID,
    async handler(req: FastifyRequest<{ Params: UpdateRequestParamsDto; Body: CardUpdateRequestDto; }>, rep: FastifyReply,) {
      const { id } = req.params;
      const group = await cardService.updateById(id, req.body);

      return rep.send(group).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE, url: CardsApiPath.$ID,
    async handler(req: FastifyRequest<{ Params: DeleteRequestParamsDto }>, rep: FastifyReply,) {
      const { id } = req.params;

      await cardService.delete(id);

      return rep.send(true).status(HttpCode.OK);
    },
  });
};

export { initCardApi };
