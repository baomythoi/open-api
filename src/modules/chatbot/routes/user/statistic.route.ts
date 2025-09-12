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

  done();
}

export default statisticRoute;