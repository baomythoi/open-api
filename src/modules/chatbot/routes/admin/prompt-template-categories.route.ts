import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import TemplateCategoriesController from '@chatbot/controllers/prompt-template-categories.controller';

// middleware
import AdminMiddleware from '@authentication/middlewares/admin.middleware';

const PromptTemplateCategoriesRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new TemplateCategoriesController().getList
  })

  fastify.route({
    method: 'GET',
    url: '/:categoryUid',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new TemplateCategoriesController().getDetail
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new TemplateCategoriesController().create
  })

  fastify.route({
    method: 'PATCH',
    url: '/:categoryUid',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new TemplateCategoriesController().update
  })

  fastify.route({
    method: 'PATCH',
    url: '/:categoryUid/status',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new TemplateCategoriesController().setStatus
  })

  fastify.route({
    method: 'POST',
    url: '/:categoryUid/delete',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new TemplateCategoriesController().delete
  })

  fastify.route({
    method: 'GET',
    url: '/active',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new TemplateCategoriesController().getAllActiveCategories
  })

  done();
}

export default PromptTemplateCategoriesRoutes;