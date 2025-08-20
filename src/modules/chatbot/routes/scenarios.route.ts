import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ScenariosController from '@chatbot/controllers/scenarios.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

/**
 * @route /v1/chatbot/scenarios
 */
const scenariosRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().getAll
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().create
  })

  fastify.route({
    method: 'PATCH',
    url: '/:scenarioUid',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().update
  })

  fastify.route({
    method: 'GET',
    url: '/:scenarioUid',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().getOne
  })

  fastify.route({
    method: 'PATCH',
    url: '/:scenarioUid/active',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().setActiveStatus
  })

  fastify.route({
    method: 'PATCH',
    url: '/:scenarioUid/soft-delete',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().softDelelte
  })

  fastify.route({
    method: 'PATCH',
    url: '/:scenarioUid/restore',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().restore
  })

  done();
}

export default scenariosRoute;