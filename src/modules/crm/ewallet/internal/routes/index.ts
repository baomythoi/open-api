import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import InternalCtrl from '@crm/ewallet/internal/controllers';

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
      new PermissionMiddleware(['internal_get_accounts']).check
    ],
    handler: new InternalCtrl().getAllAccount
  })

  fastify.route({
    method: 'GET',
    url: '/export',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['internal_export_accounts']).check
    ],
    handler: new InternalCtrl().export
  })

  fastify.route({
    method: 'GET',
    url: '/transactions',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['internal_get_account_transactions']).check
    ],
    handler: new InternalCtrl().getAccountTransactions
  })

  fastify.route({
    method: 'GET',
    url: '/transactions/:transUid',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['internal_get_account_transactions']).check
    ],
    handler: new InternalCtrl().getAccountTransaction
  })

  fastify.route({
    method: 'POST',
    url: '/topup',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['internal_manual_topup']).check
    ],
    handler: new InternalCtrl().manualTopup
  })

  fastify.route({
    method: 'GET',
    url: '/:orderCode/recover-commission',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['internal_recover_commission']).check
    ],
    handler: new InternalCtrl().recoverCommission
  })

  fastify.route({
    method: 'POST',
    url: '/campagin/:orderCode/topup',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['internal_campaign_manual_topup']).check
    ],
    handler: new InternalCtrl().campaignManualTopup
  })

  done();
};