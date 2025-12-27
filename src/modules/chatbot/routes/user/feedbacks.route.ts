import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import FeedbacksController from '@chatbot/controllers/feedbacks.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const FeedbackRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/configs',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new FeedbacksController().getConfigs
  })

  fastify.route({
    method: 'POST',
    url: '/submit',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new FeedbacksController().submitFeedback
  })

  done();
}

export default FeedbackRoutes;