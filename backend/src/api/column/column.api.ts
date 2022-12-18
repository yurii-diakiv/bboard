import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { column as columnServ } from '~/services/services';
import { HttpCode, HttpMethod, ColumnsApiPath } from '~/common/enums/enums';
import {
  ColumnCreateRequestDto,
  ColumnGetFilter,
  DeleteRequestParamsDto,
  UpdateRequestParamsDto,
  ColumnUpdateRequestDto
} from '~/common/types/types';

type Options = {
  services: { column: typeof columnServ };
};

const initColumnApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { column: columnService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: ColumnsApiPath.ROOT,
    async handler(
      req: FastifyRequest<{ Querystring: ColumnGetFilter }>,
      rep: FastifyReply
    ) {
      const columns = await columnService.getColumns(req.query);

      return rep.send(columns).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: ColumnsApiPath.ROOT,
    async handler(
      req: FastifyRequest<{ Body: ColumnCreateRequestDto }>,
      rep: FastifyReply,
    ) {
      const column = await columnService.create(req.body);

      return rep.send(column).status(HttpCode.CREATED);
    }
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: ColumnsApiPath.$ID,
    async handler(
      req: FastifyRequest<{ Params: DeleteRequestParamsDto }>,
      rep: FastifyReply,
    ) {
      const { id } = req.params;

      await columnService.delete(id);

      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: ColumnsApiPath.$ID,
    async handler(
      req: FastifyRequest<{
        Params: UpdateRequestParamsDto;
        Body: ColumnUpdateRequestDto;
      }>,
      rep: FastifyReply,
    ) {
      const { id } = req.params;
      const column = await columnService.updateById(id, req.body);

      return rep.send(column).status(HttpCode.OK);
    },
  });
};

export { initColumnApi };
