import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// controller
import FAOrderController from '@partner/mfast/controllers/products/family-accident/order.controller';

// middleware
import SecurityMiddleware from '@authentication/middlewares/security.middleware';
import UserMiddleware from '@authentication/middlewares/user.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'PATCH',
    url: '/family-accident/:orderCode/payment/callback',
    preHandler: [
      new SecurityMiddleware().verificationData,
      new UserMiddleware().verifyToken,
    ],
    handler: new FAOrderController().paymentCallback,
    onSend: new SecurityMiddleware().signingData
  });

  fastify.route({
    method: 'GET',
    url: '/family-accident/:orderCode/push-certificate',
    preHandler: [
      // new SecurityMiddleware().verificationData,
      new UserMiddleware().verifyToken,
    ],
    handler: new FAOrderController().pushCertificate,
    // onSend: new SecurityMiddleware().signingData
  });


  done();
}