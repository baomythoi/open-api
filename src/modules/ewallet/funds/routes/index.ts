import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import FundCtrl from '@ewallet/funds/controllers';

// middleware
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import UserMiddleware from '@authentication/middlewares/user.middleware';
import AppMiddleware from '@authentication/middlewares/app.middleware';
import MerchantMiddleware from '@authentication/middlewares/merchant.middleware';

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
    url: '/',
    preHandler: [
      new MerchantMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['fund_create_account']).check
    ],
    handler: new FundCtrl().createAccount
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