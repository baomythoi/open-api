import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import SettingsController from '@chatbot/controllers/settings.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const generalsRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/settings',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new SettingsController().init
  })

  fastify.route({
    method: 'GET',
    url: '/settings',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new SettingsController().get
  })

  fastify.route({
    method: 'PATCH',
    url: '/settings',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new SettingsController().update
  })

  done();
}

export default generalsRoute;