import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// routes
import AdminRoutes from '@chatbot/routes/admin/index';
import UserRoutes from '@chatbot/routes/user/index';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(AdminRoutes, {
    prefix: '/admin',
  });

  fastify.register(UserRoutes, {
    prefix: '/',
  });

  done();
};