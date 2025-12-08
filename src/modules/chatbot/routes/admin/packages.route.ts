import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import PackagesController from '@chatbot/controllers/packages.controller';

// middleware
import AdminMiddleware from '@authentication/middlewares/admin.middleware';

const PackagesRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PackagesController().adminGetList
  })

  fastify.route({
    method: 'GET',
    url: '/:packageUid',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PackagesController().adminGetDetail
  });

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PackagesController().adminCreate
  })

  fastify.route({
    method: 'PATCH',
    url: '/:packageUid',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PackagesController().adminUpdate
  })

  fastify.route({
    method: 'PATCH',
    url: '/:packageUid/status',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PackagesController().adminUpdateStatus
  })

  fastify.route({
    method: 'GET',
    url: '/metrics',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PackagesController().adminGetMetrics
  })

  done();
}

export default PackagesRoute;