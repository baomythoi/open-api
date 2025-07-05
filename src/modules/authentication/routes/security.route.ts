import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import RSAController from '@insurer/controllers/security/rsa.controller';
import SecurityController from '@mc/controllers/security.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';

const securityRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/rsa/register',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['rsa_create']).check
    ],
    handler: new RSAController().register,
  });

  fastify.route({
    method: 'POST',
    url: '/rsa/encrypt',
    preHandler: [
      new UserPortalMiddleware().verifyToken
    ],
    handler: new RSAController().encrypt,
  });

  fastify.route({
    method: 'POST',
    url: '/rsa/decrypt',
    preHandler: [
      new UserPortalMiddleware().verifyToken
    ],
    handler: new RSAController().decrypt,
  });

  fastify.route({
    method: 'POST',
    url: '/md5',
    preHandler: [
      new UserPortalMiddleware().verifyToken
    ],
    handler: new RSAController().createMD5Code,
  });

  fastify.route({
    method: 'POST',
    url: '/rsa/signing',
    preHandler: [
      new UserPortalMiddleware().verifyToken
    ],
    handler: new RSAController().signing,
  });

  fastify.route({
    method: 'POST',
    url: '/rsa/verification',
    preHandler: [
      new UserPortalMiddleware().verifyToken
    ],
    handler: new RSAController().verification,
  });

  fastify.route({
    method: 'GET',
    url: '/webview/stime',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new SecurityController().getSecretKey
  })

  fastify.route({
    method: 'GET',
    url: '/app/secret-key',
    preHandler: [
      new UserMiddleware().verifyToken,
      (req: any, reply, next) => {
        req.body = {
          mcCode: 'GSALE'
        };

        next();
      }
    ],
    handler: new SecurityController().getSecretKey
  })

  done()
}

export default securityRoute