import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// routes
import GeneralsRoutes from '@chatbot/routes/admin/generals.route';
import UserAdminRoutes from '@authentication/routes/user-admin.route';
import UsersRoutes from '@chatbot/routes/admin/users.route';
import PackagesRoutes from '@chatbot/routes/admin/packages.route';
import PromptTemplatesRoutes from '@chatbot/routes/admin/prompt-templates.route';
import ConversationRoutes from '@chatbot/routes/admin/conversations.route';
import StatisticRoutes from '@chatbot/routes/admin/statistics.route';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(GeneralsRoutes, {
    prefix: '/generals',
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

  fastify.register(PromptTemplatesRoutes, {
    prefix: `/templates`,
  });

  fastify.register(ConversationRoutes, {
    prefix: `/conversations`,
  });

  fastify.register(StatisticRoutes, {
    prefix: `/statistics`,
  });

  done();
}