import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@apps/gsale/ewallet/route'), {
    prefix: '/ewallet'
  })


  done();
};