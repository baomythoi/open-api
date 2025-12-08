import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ChannelsController from '@chatbot/controllers/channels.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

// routes
import FacebookChannelsRoutes from '@chatbot/routes/user/facebook-channels.route';
import ZaloChannelsRoutes from '@chatbot/routes/user/zalo-channels.route';

const ChannelsRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(FacebookChannelsRoutes, {
    prefix: '/facebook',
  });

  fastify.register(ZaloChannelsRoutes, {
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

export default ChannelsRoutes;