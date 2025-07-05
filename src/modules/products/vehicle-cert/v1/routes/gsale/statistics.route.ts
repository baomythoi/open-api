import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import StatisticsCtrl from '@products/vehicle-cert/v1/controllers/gsale/statistics.controller';

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
    handler: new StatisticsCtrl().getStatistics
  })

  fastify.route({
    method: 'GET',
    url: '/agents',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new StatisticsCtrl().getAgents
  })

  fastify.route({
    method: 'GET',
    url: '/collaborators',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new StatisticsCtrl().getUnderCollaborators
  })

  fastify.route({
    method: 'GET',
    url: '/collaborators/certs',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new StatisticsCtrl().getCollaboratorCerts
  })

  fastify.route({
    method: 'GET',
    url: '/chart',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new StatisticsCtrl().getChart
  })

  done();
}