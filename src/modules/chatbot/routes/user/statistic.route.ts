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

  done();
}

export default statisticRoute;