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

  fastify.register(import('@authentication/routes/user-admin.route'), {
    prefix: `/user`,
  });

  fastify.register(import('@chatbot/routes/admin/users.route'), {
    prefix: `/users`,
  });

  fastify.register(import('@chatbot/routes/admin/packages.route'), {
    prefix: `/packages`,
  });

  done();
}