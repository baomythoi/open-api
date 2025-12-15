import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// routes
import ChannelsRoutes from '@chatbot/routes/user/channels.route';
import PromptRoutes from '@chatbot/routes/user/prompt.route';
import ScenarioRoutes from '@chatbot/routes/user/scenario.route';
import StatisticRoutes from '@chatbot/routes/user/statistic.route';
import NotificationRoutes from '@chatbot/routes/user/notifications.route';
import UserRoutes from '@authentication/routes/user.route';
import ConversationRoutes from '@chatbot/routes/user/conversations.route';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(ChannelsRoutes, {
    prefix: '/channels',
  });

  fastify.register(PromptRoutes, {
    prefix: '/prompt',
  });

  fastify.register(ScenarioRoutes, {
    prefix: '/scenario',
  });

  fastify.register(StatisticRoutes, {
    prefix: '/statistic',
  });

  fastify.register(UserRoutes, {
    prefix: `/user`,
  });

  fastify.register(NotificationRoutes, {
    prefix: '/notifications',
  });

  fastify.register(ConversationRoutes, {
    prefix: '/conversations',
  });

  done();
}