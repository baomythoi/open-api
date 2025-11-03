import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import UsersController from '@chatbot/controllers/users.controller';

// middleware
import AdminMiddleware from '@authentication/middlewares/admin.middleware';

const usersRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new UsersController().adminGetList
  })

  fastify.route({
    method: 'GET',
    url: '/:userUid',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new UsersController().adminGetDetail
  });

  done();
}

export default usersRoute;