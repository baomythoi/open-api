import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import UserController from '@authentication/controllers/user.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const userRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/profile',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new UserController().profile
  })

  fastify.route({
    method: 'PATCH',
    url: '/profile',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new UserController().update
  })

  fastify.route({
    method: 'POST',
    url: '/upload-avatar',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new UserController().uploadAvatar
  })

  done();
}

export default userRoute;