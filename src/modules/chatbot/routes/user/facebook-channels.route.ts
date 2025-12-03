import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import FacebookChannelsController from '@chatbot/controllers/facebook-channels.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const facebookChannelsRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/oauth-url',
    handler: new FacebookChannelsController().getFacebookOAuthUrl
  })

  fastify.route({
    method: 'GET',
    url: '/get-url',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new FacebookChannelsController().getFacebookConnectUrl
  })

  fastify.route({
    method: 'GET',
    url: '/callback',
    handler: new FacebookChannelsController().facebookCallback
  });

  fastify.route({
    method: 'GET',
    url: '/register-webhook',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new FacebookChannelsController().registerWebhookForApp
  });

  fastify.route({
    method: 'GET',
    url: '/webhook',
    handler: new FacebookChannelsController().verifyFacebookWebhook
  });

  fastify.route({
    method: 'POST',
    url: '/webhook',
    handler: new FacebookChannelsController().facebookWebhook
  });

  fastify.route({
    method: 'PATCH',
    url: '/pages/:pageUid/active',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new FacebookChannelsController().setFacebookPageActiveStatus
  });

  fastify.route({
    method: 'PATCH',
    url: '/pages/:pageUid/prompt',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new FacebookChannelsController().updateFacebookPagePrompt
  });

  fastify.route({
    method: 'POST',
    url: '/webhook/reply',
    handler: new FacebookChannelsController().replyFromN8nToFacebook
  });

  done();
}

export default facebookChannelsRoute;