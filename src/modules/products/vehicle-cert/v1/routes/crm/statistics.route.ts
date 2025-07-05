import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import StatisticsCtrl from '@products/vehicle-cert/v1/controllers/crm/statistics.controller';

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
      new PermissionMiddleware(['vehicle_cert_get_statistics']).check
    ],
    handler: new StatisticsCtrl().getStatistics
  })

  done();
}