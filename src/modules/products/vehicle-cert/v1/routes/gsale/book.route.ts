import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import BooksCtrl from '@products/vehicle-cert/v1/controllers/gsale/book.controller';
import CertsCtrl from '@products/vehicle-cert/v1/controllers/gsale/cert.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';
import AppMiddleware from '@authentication/middlewares/app.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new BooksCtrl().getBooks
  })

  fastify.route({
    method: 'GET',
    url: '/:uid',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new BooksCtrl().getBook
  })

  fastify.route({
    method: 'GET',
    url: '/registered',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new BooksCtrl().getBooksRegistered
  })

  /** an chi */
  fastify.route({
    method: 'PATCH',
    url: '/certs/cancel',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().requestCancel
  })

  fastify.route({
    method: 'PATCH',
    url: '/certs/refund',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().requestRefund
  })

  fastify.route({
    method: 'PATCH',
    url: '/certs/report-lost',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().requestReportLost
  })

  fastify.route({
    method: 'GET',
    url: '/certs/:fundTransUid',
    preHandler: [
      new AppMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new CertsCtrl().checkCompleteFundTrans
  })

  done();
}