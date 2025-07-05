import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import MotocyclesController from '@products/master-rider/controllers/motorcycle.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';
import PBPMiddleware from '@productsHub/middlewares/pbp.middleware';

const masterRiderRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/vehicle-types',
    preHandler: [
      new UserMiddleware().verify
    ],
    handler: new MotocyclesController().getVehicleTypes,
  });

  fastify.route({
    method: 'GET',
    url: '/manufactures',
    preHandler: [
      new UserMiddleware().verify
    ],
    handler: new MotocyclesController().getManufactures,
  });

  fastify.route({
    method: 'GET',
    url: '/motorcycles',
    preHandler: [
      new UserMiddleware().verify
    ],
    handler: new MotocyclesController().getMotorcycles,
  });

  fastify.route({
    method: 'GET',
    url: '/packages',
    preHandler: [
      new UserMiddleware().verify
    ],
    handler: new MotocyclesController().getPackages,
  });

  fastify.route({
    method: 'POST',
    url: '/redeem-code/verify',
    preHandler: [
      new UserMiddleware().verify
    ],
    handler: new MotocyclesController().verifyRedeemCode
  });

  fastify.route({
    method: 'POST',
    url: '/orders',
    preHandler: [
      new UserMiddleware().verify,
      new PBPMiddleware().verifyProduct
    ],
    handler: new MotocyclesController().createOrder,
  });

  fastify.route({
    method: 'GET',
    url: '/:transCode/certificate',
    preHandler: [
      new UserMiddleware().verify
    ],
    handler: new MotocyclesController().getCertificate
  });

  fastify.route({
    method: 'GET',
    url: '/:orderCode/commission',
    preHandler: [
      new UserMiddleware().verify
    ],
    handler: new MotocyclesController().manualCommissionPayout
  });

  fastify.route({
    method: 'POST',
    url: '/commission',
    preHandler: [
      new UserMiddleware().verify
    ],
    handler: new MotocyclesController().getCommissionForView
  });

  fastify.route({
    method: 'GET',
    url: '/:orderCode/notifications',
    preHandler: [
      new UserMiddleware().verify
    ],
    handler: new MotocyclesController().manualNotificationsSend
  });

  done()
}

export default masterRiderRoute;