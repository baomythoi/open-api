import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import StatisticsController from '@chatbot/controllers/statistics.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const StatisticRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/recent-customers',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new StatisticsController().getRecentCustomers
  })

  fastify.route({
    method: 'GET',
    url: '/token-usage',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new StatisticsController().getTokenUsageChart
  })

  fastify.route({
    method: 'GET',
    url: '/monthly-customer-count',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new StatisticsController().getMonthlyCustomerCount
  })

  fastify.route({
    method: 'GET',
    url: '/monthly-token-usage',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new StatisticsController().getMonthlyTokenUsage
  })

  fastify.route({
    method: 'GET',
    url: '/monthly-conversations',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new StatisticsController().getMonthlyConversations
  })

  fastify.route({
    method: 'GET',
    url: '/conversation-chart',
    preHandler: [
      new UserMiddleware().verifyToken,
    ],
    handler: new StatisticsController().getConversationChart
  })

  done();
}

export default StatisticRoutes;