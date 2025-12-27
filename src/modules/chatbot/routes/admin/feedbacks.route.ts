import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import FeedbacksController from '@chatbot/controllers/feedbacks.controller';

// middleware
import AdminMiddleware from '@authentication/middlewares/admin.middleware';

const FeedbackRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new FeedbacksController().adminGetList
  })

  fastify.route({
    method: 'GET',
    url: '/configs',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new FeedbacksController().adminGetConfigs
  })

  fastify.route({
    method: 'GET',
    url: '/stats',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new FeedbacksController().adminGetStats
  })

  done();
}

export default FeedbackRoutes;