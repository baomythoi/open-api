import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@mc/routes/auth.route'), {
    prefix: '/auth',
  });

  fastify.register(import('@mc/routes/user.route'), {
    prefix: '/user'
  });

  fastify.register(import('@mc/routes/product.route'), {
    prefix: '/product'
  });

  done();
};