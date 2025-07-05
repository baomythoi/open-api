import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@apps/gsale/ewallet/funds/routes'), {
    prefix: '/funds'
  })


  done();
};