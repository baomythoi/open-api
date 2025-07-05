import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import AuthController from '@mc/controllers/auth.controller';
import SecurityController from '@mc/controllers/security.controller';

// middleware
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import MerchantMiddleware from '@authentication/middlewares/merchant.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/token',
    preHandler: [(req, reply, next) => {
      req.authentication.username = req.body.credentials.username;

      next();
    }, new PermissionMiddleware(['access_mc_panel']).check],
    handler: new AuthController().login,
  });

  fastify.route({
    method: 'GET',
    url: '/secret-key',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      (req: any, reply, next) => {
        req.body = {
          mcCode: 'PORTAL_MERCHANT'
        };

        next();
      },
      new PermissionMiddleware(['get_secret_key']).check
    ],
    handler: new SecurityController().getSecretKey,
  });

  done();
}