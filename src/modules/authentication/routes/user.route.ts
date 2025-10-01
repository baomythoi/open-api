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

  fastify.route({
    method: 'PATCH',
    url: '/manual-assign-package',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new UserController().manualAssignPackage
  })

  fastify.route({
    method: 'GET',
    url: '/token-stats',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new UserController().getUserTokenStats
  })

  fastify.route({
    method: 'GET',
    url: '/package',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new UserController().getUserPackage
  })

  fastify.route({
    method: 'POST',
    url: '/verify-otp',
    handler: new UserController().verifyOtp
  })

  fastify.route({
    method: 'POST',
    url: '/resend-otp',
    handler: new UserController().resendOTP
  })

  done();
}

export default userRoute;