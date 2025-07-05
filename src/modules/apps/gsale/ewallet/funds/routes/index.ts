import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import FundCtrl from '@apps/gsale/ewallet/funds/controllers';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';
import AppMiddleware from '@authentication/middlewares/app.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new FundCtrl().getAccount
  })

  fastify.route({
    method: 'POST',
    url: '/deposit',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new FundCtrl().depositIntoFund
  })

  fastify.route({
    method: 'GET',
    url: '/transactions',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new FundCtrl().getTransactions
  })

  done();
}