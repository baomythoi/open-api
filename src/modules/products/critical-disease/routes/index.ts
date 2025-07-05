import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import CriticalDiseaseCtrl from '@products/critical-disease/controllers';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';
import WebviewMiddleware from '@authentication/middlewares/webview.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/packages',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify
    ],
    handler: new CriticalDiseaseCtrl().getPackages,
  });

  fastify.route({
    method: 'POST',
    url: '/fees',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify
    ],
    handler: new CriticalDiseaseCtrl().getFees,
  });

  fastify.route({
    method: 'POST',
    url: '/order',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify
    ],
    handler: new CriticalDiseaseCtrl().createOrder,
  });

  fastify.route({
    method: 'POST',
    url: '/commission',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify
    ],
    handler: new CriticalDiseaseCtrl().getCommissionForView
  });

  fastify.route({
    method: 'GET',
    url: '/:orderCode/certificate',
    // preHandler: [
    //   new UserMiddleware().verify
    // ],
    handler: new CriticalDiseaseCtrl().viewCertificate
  });

  fastify.route({
    method: 'POST',
    url: '/reward/verify',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify
    ],
    handler: new CriticalDiseaseCtrl().verifyReward
  });

  fastify.route({
    method: 'POST',
    url: '/effective-date/verify',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify
    ],
    handler: new CriticalDiseaseCtrl().verifyEffectiveDate
  });

  done();
}