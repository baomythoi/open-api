import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import UsersController from '@chatbot/controllers/users.controller';

// middleware
import AdminMiddleware from '@authentication/middlewares/admin.middleware';

const usersRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/configs',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new UsersController().adminGetConfigs
  })

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

  fastify.route({
    method: 'PATCH',
    url: '/manual-assign-package',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new UsersController().adminManualAssignPackage
  })

  done();
}

export default usersRoute;