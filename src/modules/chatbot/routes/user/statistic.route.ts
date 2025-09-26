import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import StatisticsController from '@chatbot/controllers/statistics.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';

const statisticRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
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
    handler: new StatisticsController().getTokenUsage
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

  done();
}

export default statisticRoute;