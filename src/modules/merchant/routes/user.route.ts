import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import UserController from '@mc/controllers/user.controller';

// middleware
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import MerchantMiddleware from '@authentication/middlewares/merchant.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/profile',
    preHandler: [
      new MerchantMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['user_view_profile']).check
    ],
    handler: new UserController().profile,
  });

  fastify.route({
    method: 'PATCH',
    url: '/profile',
    preHandler: [
      new MerchantMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['user_update']).check
    ],
    handler: new UserController().editProfile,
  })

  fastify.route({
    method: 'PATCH',
    url: '/password',
    preHandler: [
      new MerchantMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['user_update']).check
    ],
    handler: new UserController().changePassword,
  })

  done();
}