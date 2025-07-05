import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@products/vehicle-cert/v2/routes/crm'), {
    prefix: '/crm',
  });

  fastify.register(import('@products/vehicle-cert/v2/routes/web'), {
    prefix: '/web',
  });

  done();
};