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

  done();
}

export default userRoute;