import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@app/src/modules/chatbot/routes/admin/index'), {
    prefix: '/admin',
  });

  fastify.register(import('@app/src/modules/chatbot/routes/user/index'), {
    prefix: '/',
  });

  done();
};