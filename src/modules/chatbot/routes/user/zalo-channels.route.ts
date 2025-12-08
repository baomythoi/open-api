import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ZaloChannelsController from '@chatbot/controllers/zalo-channels.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const ZaloChannelsRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/get-url',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ZaloChannelsController().getZaloConnectUrl
  })

  fastify.route({
    method: 'GET',
    url: '/callback',
    handler: new ZaloChannelsController().zaloCallback
  });

  fastify.route({
    method: 'GET',
    url: '/webhook',
    handler: new ZaloChannelsController().verifyZaloWebhook
  });

  fastify.route({
    method: 'POST',
    url: '/webhook',
    handler: new ZaloChannelsController().zaloWebhook
  });

  fastify.route({
    method: 'POST',
    url: '/webhook/reply',
    handler: new ZaloChannelsController().replyFromN8nToZalo
  });

  done();
}

export default ZaloChannelsRoutes;