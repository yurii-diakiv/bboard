import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { user as userServ } from '~/services/services';
import { HttpCode, HttpMethod, UsersApiPath } from '~/common/enums/enums';

type Options = {
  services: { user: typeof userServ };
};

const initUserApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { user: userService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: UsersApiPath.ROOT,
    async handler(
      req: FastifyRequest,
      rep: FastifyReply
    ) {
      const users = await userService.getUsers();

      return rep.send(users).status(HttpCode.OK);
    },
  });
};

export { initUserApi };
