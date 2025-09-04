import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@chatbot/routes/admin/index'), {
    prefix: '/admin',
  });

  fastify.register(import('@chatbot/routes/user/index'), {
    prefix: '/',
  });

  done();
};