import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import PromptsController from '@chatbot/controllers/prompts.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const promptsRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new PromptsController().getAll
  })

  fastify.route({
    method: 'GET',
    url: '/:promptUid',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new PromptsController().getOne
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new PromptsController().create
  })

  fastify.route({
    method: 'PATCH',
    url: '/:promptUid',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new PromptsController().update
  })

  fastify.route({
    method: 'PATCH',
    url: '/:promptUid/active',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new PromptsController().setActiveStatus
  })

  done();
}

export default promptsRoute;