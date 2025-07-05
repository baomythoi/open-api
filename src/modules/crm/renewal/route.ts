import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import RenewalController from '@crm/renewal/controllers/renewal.controller';
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/provider',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['renewal_get_orders']).check
    ],
    handler: new RenewalController().getProviders,
  });

  fastify.route({
    method: 'POST',
    url: '/merchant',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['renewal_get_orders']).check
    ],
    handler: new RenewalController().getMerchants,
  });

  fastify.route({
    method: 'POST',
    url: '/product',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['renewal_get_orders']).check
    ],
    handler: new RenewalController().getProducts,
  });

  fastify.route({
    method: 'GET',
    url: '/status',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['renewal_get_orders']).check
    ],
    handler: new RenewalController().getStatus,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['renewal_get_orders']).check
    ],
    handler: new RenewalController().getRenewals,
  });

  fastify.route({
    method: 'GET',
    url: '/:renewalCode',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['renewal_get_orders']).check
    ],
    handler: new RenewalController().getRenewal,
  });

  fastify.route({
    method: 'POST',
    url: '/note-repurchase',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['renewal_get_orders']).check
    ],
    handler: new RenewalController().noteRepurchase,
  });

  done();
}
