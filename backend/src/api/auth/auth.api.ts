import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { auth as authServ, user as userServ } from '~/services/services';
import { HttpCode, HttpMethod, AuthApiPath } from '~/common/enums/enums';
import { UserSignUpRequestDto, UserSignInRequestDto } from '~/common/types/types';

type Options = {
  services: { user: typeof userServ; auth: typeof authServ };
};

const initAuthApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { auth: authService, user: userService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: AuthApiPath.ROOT,
    async handler(req, rep) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];
      const user = await authService.getCurrentUser(token);

      return rep.send(user).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.SIGN_UP,
    async handler(
      req: FastifyRequest<{ Body: UserSignUpRequestDto }>,
      rep: FastifyReply,
    ) {
      const user = await userService.create(req.body);

      return rep.send(user).status(HttpCode.CREATED);
    }
  });

  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.LOGIN,
    async handler(
      req: FastifyRequest<{ Body: UserSignInRequestDto }>,
      rep: FastifyReply,
    ) {
      const signInUserPayload = await authService.getUser(req.body);
      
      return rep.send(signInUserPayload).status(HttpCode.OK);
    }
  });
};

export { initAuthApi };
