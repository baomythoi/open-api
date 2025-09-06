import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import UploadsController from '@chatbot/controllers/uploads.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const uploadsRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/avatars/facebook/:userId',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new UploadsController().getFacebookAvatar
  })

  fastify.route({
    method: 'GET',
    url: '/scenarios/templates',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new UploadsController().getScenarioTemplate
  })

  done();
}

export default uploadsRoute;