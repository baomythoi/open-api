import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import IUserController from '@insurer/controllers/auth/user.controller';

// middleware
import SecurityMiddleware from '@authentication/middlewares/security.middleware';

const authRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/token',
    preHandler: new SecurityMiddleware().verificationData,
    handler: new IUserController().login,
    onSend: new SecurityMiddleware().signingData
  });

  done()
}

export default authRoute