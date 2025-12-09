import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import PromptTemplatesController from '@chatbot/controllers/prompt-templates.controller';

// middleware
import AdminMiddleware from '@authentication/middlewares/admin.middleware';

const PromptTemplatesRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PromptTemplatesController().getList
  })

  fastify.route({
    method: 'GET',
    url: '/:templateUid',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PromptTemplatesController().getDetail
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PromptTemplatesController().create
  })

  fastify.route({
    method: 'PATCH',
    url: '/:templateUid',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PromptTemplatesController().update
  })

  fastify.route({
    method: 'PATCH',
    url: '/:templateUid/status',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PromptTemplatesController().setStatus
  })

  fastify.route({
    method: 'PATCH',
    url: '/:templateUid/featured',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PromptTemplatesController().setFeatured
  })

  fastify.route({
    method: 'POST',
    url: '/:templateUid/delete',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PromptTemplatesController().delete
  })

  fastify.route({
    method: 'POST',
    url: '/:templateUid/copy',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PromptTemplatesController().copy
  })

  fastify.route({
    method: 'GET',
    url: '/featured',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new PromptTemplatesController().getFeaturedList
  })

  done();
}

export default PromptTemplatesRoutes;