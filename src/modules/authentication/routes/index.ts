import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@authentication/routes/auth.route'), {
    prefix: `/`,
  });

  done();
}
