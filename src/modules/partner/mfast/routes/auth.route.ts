import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import MfastUserController from '@partner/mfast/controllers/user.controller';

// middleware
import SecurityMiddleware from '@authentication/middlewares/security.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/token',
    preHandler: new SecurityMiddleware().verificationData,
    handler: new MfastUserController().login,
    onSend: new SecurityMiddleware().signingData
  });

  done()
}