import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ConversationController from '@chatbot/controllers/conversations.controller';

// middleware
import AdminMiddleware from '@authentication/middlewares/admin.middleware';

const ConversationRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ConversationController().adminGetList
  })

  fastify.route({
    method: 'GET',
    url: '/:conversationUid',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ConversationController().adminGetDetail
  })

  fastify.route({
    method: 'GET',
    url: '/:conversationUid/messages',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ConversationController().adminGetMessages
  });

  fastify.route({
    method: 'GET',
    url: '/stats',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new ConversationController().adminGetStats
  });

  done();
}

export default ConversationRoutes;