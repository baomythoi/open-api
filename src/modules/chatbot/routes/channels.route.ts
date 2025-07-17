import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ChannelsController from '@chatbot/controllers/channels.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const channelsRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/facebook/get-url',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ChannelsController().getFacebookConnectUrl
  })

  fastify.route({
    method: 'GET',
    url: '/facebook/callback',
    handler: new ChannelsController().facebookCallback
  });

  fastify.route({
    method: 'GET',
    url: '/facebook/register-webhook',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ChannelsController().registerWebhookForApp
  });

  fastify.route({
    method: 'GET',
    url: '/facebook/webhook',
    handler: new ChannelsController().verifyFacebookWebhook
  });

  fastify.route({
    method: 'POST',
    url: '/facebook/webhook',
    handler: new ChannelsController().facebookWebhook
  });

  fastify.route({
    method: 'PATCH',
    url: '/facebook/pages/:pageUid/status',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ChannelsController().setFacebookPageActiveStatus
  });

  done();
}

export default channelsRoute;