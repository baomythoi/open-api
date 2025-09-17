import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, options1: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@authentication/routes'), {
    prefix: `/auth`,
  });

  fastify.register(import('@cron/routes'), {
    prefix: '/cron'
  })

  fastify.register(import('@chatbot/routes'), {
    prefix: '/chatbot'
  })

  done();
};