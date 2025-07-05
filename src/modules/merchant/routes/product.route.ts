import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import ProductController from '@mc/controllers/product.controller';

// middleware
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import MerchantMiddleware from '@authentication/middlewares/merchant.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/pbp',
    preHandler: [
      new MerchantMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['view_products']).check
    ],
    handler: new ProductController().getPBPList,
  });

  fastify.route({
    method: 'GET',
    url: '/pbp/orders',
    preHandler: [
      new MerchantMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['view_orders']).check
    ],
    handler: new ProductController().getOrders
  })

  fastify.route({
    method: 'GET',
    url: '/pbp/orders/export',
    preHandler: [
      new MerchantMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['download_files']).check
    ],
    handler: new ProductController().exportOrders
  })

  fastify.route({
    method: 'GET',
    url: '/pbp/dashboard',
    preHandler: [
      new MerchantMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['view_orders']).check
    ],
    handler: new ProductController().getDashBoard
  })

  done();
}