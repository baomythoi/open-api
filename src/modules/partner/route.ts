import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const insurerRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@partner/mfast/routes'), {
    prefix: `/mfast`,
  });

  done();
}

export default insurerRoute;