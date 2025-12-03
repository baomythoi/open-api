import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ChannelsController from '@chatbot/controllers/channels.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const channelsRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@chatbot/routes/user/facebook-channels.route'), {
    prefix: '/facebook',
  });

  fastify.register(import('@chatbot/routes/user/zalo-channels.route'), {
    prefix: '/zalo',
  });

  fastify.route({
    method: 'GET',
    url: '/pages',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ChannelsController().getPages
  })

  fastify.route({
    method: 'POST',
    url: '/pages/:pageUid/delete',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new ChannelsController().deletePage
  });

  done();
}

export default channelsRoute;