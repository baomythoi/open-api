import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@products/vehicle-cert/v1/routes/crm/book.route'), {
    prefix: '/books',
  });

  fastify.register(import('@products/vehicle-cert/v1/routes/crm/cert.route'), {
    prefix: '/certs',
  });

  fastify.register(import('@products/vehicle-cert/v1/routes/crm/car.route'), {
    prefix: '/car',
  });

  fastify.register(import('@products/vehicle-cert/v1/routes/crm/statistics.route'), {
    prefix: '/statistics',
  });

  done();
};