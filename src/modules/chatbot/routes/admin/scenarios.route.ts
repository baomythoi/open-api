import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ScenariosController from '@chatbot/controllers/scenarios.controller';

// middleware
import AdminMiddleware from '@authentication/middlewares/admin.middleware';

/**
 * @route /v1/chatbot/scenarios
 */
const ScenariosRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ScenariosController().getAll
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ScenariosController().create
  })

  fastify.route({
    method: 'PATCH',
    url: '/:scenarioUid',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ScenariosController().update
  })

  fastify.route({
    method: 'GET',
    url: '/:scenarioUid',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ScenariosController().getOne
  })

  fastify.route({
    method: 'PATCH',
    url: '/:scenarioUid/active',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ScenariosController().setActiveStatus
  })

  fastify.route({
    method: 'PATCH',
    url: '/:scenarioUid/soft-delete',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ScenariosController().softDelelte
  })

  fastify.route({
    method: 'PATCH',
    url: '/:scenarioUid/restore',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ScenariosController().restore
  })

  done();
}

export default ScenariosRoutes;