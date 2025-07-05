import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// ctrl
import SecurityController from '@mc/controllers/security.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const productsRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/stime',
    preHandler: [
      new UserMiddleware().verify,
    ],
    handler: new SecurityController().getSecretKey
  })

  fastify.register(import('@products/master-rider/routes'), {
    prefix: `/master-rider`,
  });

  fastify.register(import('@products/vehicle-cert/v2/routes'), {
    prefix: `/vehicle-cert`,
  });

  fastify.register(import('@products/critical-disease/routes'), {
    prefix: `/critical-disease`,
  });

  done();
}

export default productsRoute;