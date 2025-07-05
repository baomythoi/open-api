import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@crm/auth/routes/auth'), {
    prefix: `/auth`,
  });

  fastify.register(import('@crm/ewallet/route'), {
    prefix: `/ewallet`,
  });

  fastify.register(import('@crm/renewal/route'), {
    prefix: `/renewal`,
  });

  done();
};
