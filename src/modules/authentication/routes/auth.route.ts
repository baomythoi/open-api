import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import AuthController from '@authentication/controllers/auth.controller';

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
    method: 'POST',
    url: '/register',
    handler: new AuthController().register
  })

  done();
}

export default authRoute;