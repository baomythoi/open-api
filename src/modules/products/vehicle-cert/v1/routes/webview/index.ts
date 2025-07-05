import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@products/vehicle-cert/v1/routes/webview/book.route'), {
    prefix: '/books',
  });

  fastify.register(import('@products/vehicle-cert/v1/routes/webview/cert.route'), {
    prefix: '/certs',
  });

  fastify.register(import('@products/vehicle-cert/v1/routes/webview/car.route'), {
    prefix: '/car',
  });

  done();
};