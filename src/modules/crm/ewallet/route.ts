import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@crm/ewallet/funds/routes'), {
    prefix: `/funds`,
  });

  fastify.register(import('@crm/ewallet/internal/routes'), {
    prefix: `/internal`,
  });

  done();
};