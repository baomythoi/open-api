import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@chatbot/routes/user/channels.route'), {
    prefix: '/channels',
  });

  fastify.register(import('@chatbot/routes/user/prompt.route'), {
    prefix: '/prompt',
  });

  fastify.register(import('@chatbot/routes/user/scenario.route'), {
    prefix: '/scenario',
  });

  done();
}