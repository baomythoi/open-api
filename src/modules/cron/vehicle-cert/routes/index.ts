import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import VehicleCertController from '@cron/vehicle-cert/controller/vehicle-cert';

const VehicleCertRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  // Send at 8h AM and 1h30 PM
  fastify.route({
    method: 'GET',
    url: '/send-not-use-48h',
    handler: new VehicleCertController().SendNotUse48h
  });

  done()
}

export default VehicleCertRoute;
