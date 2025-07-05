import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import CarCtrl from '@products/vehicle-cert/v1/controllers/webview/car.controller';

// middleware
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import CRMMiddleware from '@authentication/middlewares/crm.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/types',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_cert']).check
    ],
    handler: new CarCtrl().getCarTypes
  })

  fastify.route({
    method: 'GET',
    url: '/types/:typeCode',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_cert']).check
    ],
    handler: new CarCtrl().getCarTypeDetail
  })

  done();
}