import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import PermissionController from '@authorization/controllers/permission.controller';

// middleware
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';

const PermissionRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/assign',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['permission_create']).check
    ],
    handler: new PermissionController().assign,
  });

  done();
}

export default PermissionRoute;