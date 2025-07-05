import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import SubscribeApiController from '@insurer/controllers/products-hub/subscribe-api.controller';
import InsurerProduct from '@insurer/controllers/products-hub/product.controller';
import InsurerPBP from '@insurer/controllers/products-hub/pbp.controller';

// middleware
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import SecurityMiddleware from '@authentication/middlewares/security.middleware';
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';

const productsHubRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/products',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['view_products']).check
    ],
    handler: new InsurerProduct().productList,
    onSend: new SecurityMiddleware().signingData
  });

  fastify.route({
    method: 'GET',
    url: '/pbp',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['view_products']).check
    ],
    handler: new InsurerPBP().productList,
    onSend: new SecurityMiddleware().signingData
  });

  fastify.route({
    method: 'POST',
    url: '/subscribe',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['create_subscribe_api']).check,
      new SecurityMiddleware().verificationData
    ],
    handler: new SubscribeApiController().subscribe,
    onSend: new SecurityMiddleware().signingData
  });

  fastify.route({
    method: 'PATCH',
    url: '/unsubscribe',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['update_subscribe_api']).check,
      new SecurityMiddleware().verificationData
    ],
    handler: new SubscribeApiController().unSubscribe,
    onSend: new SecurityMiddleware().signingData
  });

  fastify.route({
    method: 'GET',
    url: '/subscribe-list',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['view_subscribe_api']).check,
    ],
    handler: new SubscribeApiController().subscribeList,
    onSend: new SecurityMiddleware().signingData
  });

  done();
}

export default productsHubRoute;