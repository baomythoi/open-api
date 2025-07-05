import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.register(import('@cron/tracking-user-reward/routes'), {
    prefix: '/tracking-user-reward',
  });

  fastify.register(import('@cron/vehicle-cert/routes'), {
    prefix: '/vehicle-cert',
  });

  fastify.register(import('@cron/users/routes'), {
    prefix: '/users'
  })

  done();
};
