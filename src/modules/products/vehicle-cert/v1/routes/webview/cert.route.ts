import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import CertsCtrl from '@products/vehicle-cert/v1/controllers/webview/cert.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';
import WebviewMiddleware from '@authentication/middlewares/webview.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/vehicle-type',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().getVehicleType
  })

  fastify.route({
    method: 'GET',
    url: '/series',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().getSeries
  })

  fastify.route({
    method: 'POST',
    url: '/debt/use',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().useDebt
  })

  fastify.route({
    method: 'POST',
    url: '/deposit/motorbike/fees',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().depositMotorbikeFees
  })

  fastify.route({
    method: 'POST',
    url: '/deposit/car/fees',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().depositCarFees
  })

  fastify.route({
    method: 'POST',
    url: '/deposit/motorbike/use',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().motorUseDeposit
  })

  fastify.route({
    method: 'POST',
    url: '/deposit/car/use',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().carUseDeposit
  })

  fastify.route({
    method: 'POST',
    url: '/motorbike/commission',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().motorbikeCommission
  })

  fastify.route({
    method: 'POST',
    url: '/car/commission',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().carCommission
  })

  done();
}