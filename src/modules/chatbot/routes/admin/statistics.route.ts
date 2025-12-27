import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import StatisticsController from '@chatbot/controllers/statistics.controller';

// middleware
import AdminMiddleware from '@authentication/middlewares/admin.middleware';

const StatisticRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/token-usage',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetTokenUsageChart
  })

  fastify.route({
    method: 'GET',
    url: '/monthly-token-usage',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetMonthlyTokenUsage
  })

  fastify.route({
    method: 'GET',
    url: '/monthly-conversations',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetMonthlyConversations
  })

  fastify.route({
    method: 'GET',
    url: '/conversation-chart',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetConversationChart
  })

  fastify.route({
    method: 'GET',
    url: '/total-users',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetTotalUsersCount
  })

  fastify.route({
    method: 'GET',
    url: '/total-expired-users',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetTotalExpiredUsersCount
  })

  fastify.route({
    method: 'GET',
    url: '/total-active-users',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetTotalActiveUsersCount
  })

  fastify.route({
    method: 'GET',
    url: '/latest-users',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetLatestUsers
  })

  fastify.route({
    method: 'GET',
    url: '/expiring-users',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetTopExpiringUsers
  })

  fastify.route({
    method: 'GET',
    url: '/total-users-by-package-chart',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetUsersWithPackageChart
  })

  fastify.route({
    method: 'GET',
    url: '/users-growth-chart',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetUsersGrowthChart
  })

  fastify.route({
    method: 'GET',
    url: '/monthly-revenue-chart',
    preHandler: [
      new AdminMiddleware().verifyToken,
    ],
    handler: new StatisticsController().adminGetMonthlyRevenueChart
  }),

  done();
}

export default StatisticRoutes;