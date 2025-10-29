import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import AdminAuthController from '@authentication/controllers/admin-auth.controller';

const adminAuthRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/token',
    preHandler: [(req, reply, next) => {
      req.authentication.username = req.body.credentials.username;
      next();
    }],
    handler: new AdminAuthController().login,
  });

  fastify.route({
    method: 'POST',
    url: '/register',
    handler: new AdminAuthController().register
  })

  done();
}

export default adminAuthRoute;