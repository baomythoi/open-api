import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@app/src/modules/chatbot/routes/user/channels.route'), {
    prefix: '/channels',
  });

  fastify.register(import('@app/src/modules/chatbot/routes/user/prompt.route'), {
    prefix: '/prompt',
  });

  fastify.register(import('@app/src/modules/chatbot/routes/user/scenario.route'), {
    prefix: '/scenario',
  });

  done();
}