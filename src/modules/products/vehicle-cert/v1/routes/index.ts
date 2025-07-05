import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@products/vehicle-cert/v1/routes/crm'), {
    prefix: '/crm',
  });

  fastify.register(import('@products/vehicle-cert/v1/routes/webview'), {
    prefix: '/webview',
  });

  fastify.register(import('@products/vehicle-cert/v1/routes/gsale'), {
    prefix: '/gsale',
  });

  done();
};