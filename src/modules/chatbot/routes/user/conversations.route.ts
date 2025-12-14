import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ConversationController from '@chatbot/controllers/conversations.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const ConversationRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ConversationController().getList
  })

  fastify.route({
    method: 'GET',
    url: '/:conversationUid',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ConversationController().getDetail
  })

  fastify.route({
    method: 'PATCH',
    url: '/:conversationUid/end',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ConversationController().manualEndConversation
  });

  done();
}

export default ConversationRoutes;