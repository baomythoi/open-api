import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const insurerRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@partner/mfast/routes/auth.route'), {
    prefix: `/auth`,
  });

  fastify.register(import('@partner/mfast/routes/product.route'), {
    prefix: `/products`,
  });

  done();
}

export default insurerRoute;