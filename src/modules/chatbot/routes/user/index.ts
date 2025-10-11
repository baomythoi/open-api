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

  fastify.register(import('@chatbot/routes/user/statistic.route'), {
    prefix: '/statistic',
  });

  fastify.register(import('@authentication/routes/user.route'), {
    prefix: `/user`,
  });

  fastify.register(import('@chatbot/routes/user/notifications.route'), {
    prefix: '/notifications',
  });

  done();
}