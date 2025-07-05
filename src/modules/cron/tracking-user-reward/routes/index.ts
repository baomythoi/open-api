import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import TrackingUserRewardController from '@cron/tracking-user-reward/controller/user-reward.controller';

const trackingUserRewardRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/refund-pending',
    handler: new TrackingUserRewardController().refundPending
  });

  done()
}

export default trackingUserRewardRoute;