import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import UserController from '@g2/controllers/user.controller';

// util
import Whitelist from '@utils/white-list';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/website/private-id/upload',
    config: {
      rateLimit: {
        max: 4,
        timeWindow: '1 minute'
      }
    },
    preHandler: [
      Whitelist.origins,
      new UserMiddleware().verifyToken,
    ],
    handler: new UserController().uploadPrivateId,
  });

  fastify.route({
    method: 'POST',
    url: '/website/signature/upload',
    config: {
      rateLimit: {
        max: 4,
        timeWindow: '1 minute'
      }
    },
    preHandler: [
      Whitelist.origins,
      new UserMiddleware().verifyToken,
    ],
    handler: new UserController().uploadPrivateId,
  });

  done();
};