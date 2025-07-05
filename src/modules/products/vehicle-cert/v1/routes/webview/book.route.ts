import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import BooksCtrl from '@products/vehicle-cert/v1/controllers/webview/book.controller';

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';
import WebviewMiddleware from '@authentication/middlewares/webview.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new BooksCtrl().getBooks
  })

  fastify.route({
    method: 'GET',
    url: '/providers',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new BooksCtrl().getProviders
  })

  fastify.route({
    method: 'POST',
    url: '/fees',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new BooksCtrl().getFees
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verifyToken,
    ],
    handler: new BooksCtrl().registerBooks
  })

  done();
}