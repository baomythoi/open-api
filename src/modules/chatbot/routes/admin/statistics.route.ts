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

  done();
}

export default StatisticRoutes;