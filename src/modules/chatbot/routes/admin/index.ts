import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// routes
import GeneralsRoutes from '@chatbot/routes/admin/generals.route';
import PromptsRoutes from '@chatbot/routes/admin/prompts.route';
import ScenariosRoutes from '@chatbot/routes/admin/scenarios.route';
import UserAdminRoutes from '@authentication/routes/user-admin.route';
import UsersRoutes from '@chatbot/routes/admin/users.route';
import PackagesRoutes from '@chatbot/routes/admin/packages.route';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(GeneralsRoutes, {
    prefix: '/generals',
  });

  fastify.register(PromptsRoutes, {
    prefix: '/prompts',
  });

  fastify.register(ScenariosRoutes, {
    prefix: '/scenarios',
  });

  fastify.register(UserAdminRoutes, {
    prefix: `/user`,
  });

  fastify.register(UsersRoutes, {
    prefix: `/users`,
  });

  fastify.register(PackagesRoutes, {
    prefix: `/packages`,
  });

  done();
}