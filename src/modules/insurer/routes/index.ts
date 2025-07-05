import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const insurerRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@insurer/routes/auth.route'), {
    prefix: `/auth`,
  });

  fastify.register(import('@insurer/routes/products-hub.route'), {
    prefix: `/products-hub`,
  });

  done();
}

export default insurerRoute;