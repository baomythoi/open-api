import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import NotificationsController from '@chatbot/controllers/notifications.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const NotificationRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new NotificationsController().userGetList
  })

  fastify.route({
    method: 'GET',
    url: '/:notificationUid',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new NotificationsController().userGetDetail
  })

  fastify.route({
    method: 'PATCH',
    url: '/:notificationUid/read',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new NotificationsController().userRead
  })

  fastify.route({
    method: 'PATCH',
    url: '/read/all',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new NotificationsController().userReadAll
  })

  done();
}

export default NotificationRoutes;