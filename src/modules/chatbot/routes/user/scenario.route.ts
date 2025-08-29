import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ScenariosController from '@chatbot/controllers/scenarios.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const scenarioRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().userGet
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().userCreate
  })

  fastify.route({
    method: 'PATCH',
    url: '/step/:stepUid',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().userUpdate
  })

  fastify.route({
    method: 'POST',
    url: '/step/:stepUid/delete',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().userDelete
  })

  fastify.route({
    method: 'PATCH',
    url: '/step/:stepUid/active',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ScenariosController().userSetActive
  })

  done();
}

export default scenarioRoute;