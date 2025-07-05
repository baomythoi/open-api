import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import UserController from '@crm/auth/controllers/user.controller';

// middleware
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import MCSecurityController from '@mc/controllers/security.controller';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/token',
    preHandler: [(req, reply, next) => {
      req.authentication.username = req.body.credentials.username;
      req.authentication.clientType = req.body.clientType;

      next();
    }, new PermissionMiddleware(['access_crm_panel']).check],
    handler: new UserController().login,
  });

  fastify.route({
    method: 'GET',
    url: '/secret-key',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      (req: any, reply, next) => {
        req.body = {
          mcCode: 'CRM'
        };

        next();
      },
      new PermissionMiddleware(['get_secret_key']).check
    ],
    handler: new MCSecurityController().getSecretKey,
  });

  done();
}