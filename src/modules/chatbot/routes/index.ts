import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@chatbot/routes/channels.route'), {
    prefix: '/channels',
  });

  fastify.register(import('@chatbot/routes/generals.route'), {
    prefix: '/generals',
  });

  fastify.register(import('@chatbot/routes/prompts.route'), {
    prefix: '/prompts',
  });

  done();
};