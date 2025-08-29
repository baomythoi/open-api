import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import PromptsController from '@chatbot/controllers/prompts.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const promptRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new PromptsController().userGet
  })

  fastify.route({
    method: 'GET',
    url: '/:promptUid',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new PromptsController().userGetOne
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new PromptsController().userCreate
  })

  fastify.route({
    method: 'PATCH',
    url: '/:promptUid',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new PromptsController().userUpdate
  })

  fastify.route({
    method: 'PATCH',
    url: '/:promptUid/delete',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new PromptsController().userDelete
  })

  done();
}

export default promptRoute;