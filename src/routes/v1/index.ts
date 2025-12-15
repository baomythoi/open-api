import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// routes
import AuthRoutes from '@authentication/routes';
import ChatbotRoutes from '@chatbot/routes';

export default (fastify: FastifyInstance, options1: FastifyPluginOptions, done: () => void) => {
  fastify.register(AuthRoutes, {
    prefix: `/auth`,
  });

  fastify.register(ChatbotRoutes, {
    prefix: '/chatbot'
  })

  done();
};