import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import SettingsController from '@chatbot/controllers/settings.controller';

// middleware
import AdminMiddleware from '@authentication/middlewares/admin.middleware';

const GeneralsRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/settings',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new SettingsController().init
  })

  fastify.route({
    method: 'GET',
    url: '/settings',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new SettingsController().get
  })

  fastify.route({
    method: 'PATCH',
    url: '/settings',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new SettingsController().update
  })

  done();
}

export default GeneralsRoutes;