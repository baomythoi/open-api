import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@products/vehicle-cert/v1/routes/gsale/book.route'), {
    prefix: '/books',
  });

  fastify.register(import('@products/vehicle-cert/v1/routes/gsale/statistics.route'), {
    prefix: '/statistics',
  });

  done();
};