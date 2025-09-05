import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ChannelsController from '@chatbot/controllers/channels.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const channelsRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/facebook/oauth-url',
    handler: new ChannelsController().getFacebookOAuthUrl
  })

  fastify.route({
    method: 'GET',
    url: '/pages',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ChannelsController().getPages
  })

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
    url: '/facebook/pages/:pageUid/active',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ChannelsController().setFacebookPageActiveStatus
  });

  fastify.route({
    method: 'PATCH',
    url: '/facebook/pages/:pageUid/prompt',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ChannelsController().updateFacebookPagePrompt
  });

  fastify.route({
    method: 'POST',
    url: '/facebook/pages/:pageUid/delete',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ChannelsController().deleteFacebookPage
  });

  fastify.route({
    method: 'POST',
    url: '/facebook/webhook/reply',
    handler: new ChannelsController().replyFromN8n
  });

  fastify.route({
    method: 'GET',
    url: '/zalo/get-url',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ChannelsController().getZaloConnectUrl
  })

  fastify.route({
    method: 'GET',
    url: '/zalo/callback',
    handler: new ChannelsController().zaloCallback
  });

  done();
}

export default channelsRoute;