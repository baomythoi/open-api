import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import UserController from '@authentication/controllers/user.controller';
import AuthController from '@authentication/controllers/auth.controller';
import SecurityController from '@mc/controllers/security.controller';

const authRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/token',
    preHandler: [(req, reply, next) => {
      req.authentication.username = req.body.credentials.username;
      next();
    }],
    handler: new AuthController().login,
  });

  fastify.route({
    method: 'GET',
    url: '/stime',
    handler: new SecurityController().getSecretKey,
  });

  fastify.route({
    method: 'POST',
    url: '/check',
    handler: new AuthController().checkExist
  })

  fastify.route({
    method: 'POST',
    url: '/register',
    handler: new AuthController().register
  })

  done();
}

export default authRoute;