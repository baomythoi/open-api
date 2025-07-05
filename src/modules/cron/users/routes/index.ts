import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// ctrl
import UserLevelReviewCtrl from '@cron/users/controllers/level-review.controller';

const rateLimitMax = process.env.NODE_ENV !== 'production' ? 1_000 : 1;

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/level-upgrade-review',
    config: {
      rateLimit: {
        max: rateLimitMax,
        timeWindow: '1d'
      }
    },
    handler: new UserLevelReviewCtrl().review
  });

  fastify.route({
    method: 'GET',
    url: '/change-parent-review',
    config: {
      rateLimit: {
        max: rateLimitMax,
        timeWindow: '1d'
      }
    },
    handler: new UserLevelReviewCtrl().changeParetnt
  });

  fastify.route({
    method: 'GET',
    url: '/level-downgrade-review',
    config: {
      rateLimit: {
        max: rateLimitMax,
        timeWindow: '1d'
      }
    },
    handler: new UserLevelReviewCtrl().reviewDowngrade
  });

  fastify.route({
    method: 'GET',
    url: '/level-review-notify',
    config: {
      rateLimit: {
        max: rateLimitMax,
        timeWindow: '1d'
      }
    },
    handler: new UserLevelReviewCtrl().levelReviewNotify
  });

  done();
}