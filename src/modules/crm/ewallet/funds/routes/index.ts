import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import FundCtrl from '@crm/ewallet/funds/controllers';

/** middleware */
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import CRMMiddleware from '@authentication/middlewares/crm.middleware';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['fund_get_accounts']).check
    ],
    handler: new FundCtrl().getAllAccount
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['fund_create_account']).check
    ],
    handler: new FundCtrl().createAccount
  })

  fastify.route({
    method: 'GET',
    url: '/transactions',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['fund_get_account_transactions']).check
    ],
    handler: new FundCtrl().getAccountTransactions
  })

  fastify.route({
    method: 'PATCH',
    url: '/:agentCode/balance',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['fund_update_balance']).check
    ],
    handler: new FundCtrl().updateBalance
  })

  fastify.route({
    method: 'PATCH',
    url: '/:agentCode/debt',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['fund_update_debt']).check
    ],
    handler: new FundCtrl().updateDebt
  })

  fastify.route({
    method: 'GET',
    url: '/export',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['fund_export_accounts']).check
    ],
    handler: new FundCtrl().exportAllAccount
  })

  fastify.route({
    method: 'GET',
    url: '/transactions/export',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['fund_export_account_transactions']).check
    ],
    handler: new FundCtrl().exportAccountTransactions
  })

  done();
};