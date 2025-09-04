import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@chatbot/routes/admin/generals.route'), {
    prefix: '/generals',
  });

  fastify.register(import('@chatbot/routes/admin/prompts.route'), {
    prefix: '/prompts',
  });

  fastify.register(import('@chatbot/routes/admin/scenarios.route'), {
    prefix: '/scenarios',
  });

  done();
}