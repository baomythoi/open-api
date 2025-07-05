import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import CarCtrl from '@products/vehicle-cert/v1/controllers/webview/car.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';
import WebviewMiddleware from '@authentication/middlewares/webview.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/types',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CarCtrl().getCarTypes
  })

  fastify.route({
    method: 'GET',
    url: '/types/:typeCode',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CarCtrl().getCarTypeDetail
  })

  done();
}