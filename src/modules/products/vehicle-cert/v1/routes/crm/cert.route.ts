import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import CertCtrl from '@products/vehicle-cert/v1/controllers/crm/cert.controller';
import WebCertCtrl from '@products/vehicle-cert/v1/controllers/webview/cert.controller';


// middleware
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import CRMMiddleware from '@authentication/middlewares/crm.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_certs']).check
    ],
    handler: new CertCtrl().getCerts
  })

  fastify.route({
    method: 'PATCH',
    url: '/confirm-agent-return',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_confirm_agent_return_cert']).check
    ],
    handler: new CertCtrl().confirmAgentReturn
  })

  fastify.route({
    method: 'PATCH',
    url: '/confirm-return-to-provider',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_confirm_return_to_provider']).check
    ],
    handler: new CertCtrl().confirmReturnToProvider
  })

  fastify.route({
    method: 'PATCH',
    url: '/:certUid/confirm-agent-cancel',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_confirm_agent_cancel_cert']).check
    ],
    handler: new CertCtrl().confirmAgentCancel
  })

  fastify.route({
    method: 'PATCH',
    url: '/confirm-agent-reject',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_confirm_agent_reject_cert']).check
    ],
    handler: new CertCtrl().confirmAgentReject
  })

  fastify.route({
    method: 'GET',
    url: '/:certUid',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_cert']).check
    ],
    handler: new CertCtrl().getCert
  })

  fastify.route({
    method: 'GET',
    url: '/status',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_cert']).check
    ],
    handler: new CertCtrl().getStatus
  })

  fastify.route({
    method: 'POST',
    url: '/motorbike/fees',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_cert']).check
    ],
    handler: new WebCertCtrl().depositMotorbikeFees
  })

  fastify.route({
    method: 'POST',
    url: '/car/fees',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_cert']).check
    ],
    handler: new WebCertCtrl().depositCarFees
  })

  fastify.route({
    method: 'POST',
    url: '/motorbike/complete',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_complete_cert']).check
    ],
    handler: new CertCtrl().motorCompleteUse
  })

  fastify.route({
    method: 'POST',
    url: '/car/complete',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_complete_cert']).check
    ],
    handler: new CertCtrl().carCompleteUse
  })

  fastify.route({
    method: 'GET',
    url: '/export',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_export_books']).check
    ],
    handler: new CertCtrl().exportCerts
  })

  fastify.route({
    method: 'GET',
    url: '/:orderCode/commission',
    preHandler: [
      new UserPortalMiddleware().verifyToken,
    ],
    handler: new CertCtrl().manualCommissionPayout
  });


  done();
}