import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import BooksCtrl from '@products/vehicle-cert/v1/controllers/crm/book.controller';

// middleware
import PermissionMiddleware from '@authorization/middlewares/permission.middlewares';
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import CRMMiddleware from '@authentication/middlewares/crm.middleware';

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/config',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_book_create']).check
    ],
    handler: new BooksCtrl().configCreate
  })

  fastify.route({
    method: 'POST',
    url: '/verify-data',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_book_create']).check
    ],
    handler: new BooksCtrl().verifyDataBeforeCreate,
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_book_create']).check
    ],
    handler: new BooksCtrl().create,
  })

  fastify.route({
    method: 'POST',
    url: '/types',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_book_create']).check
    ],
    handler: new BooksCtrl().createBookType
  })

  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_books']).check
    ],
    handler: new BooksCtrl().getBooks
  })

  fastify.route({
    method: 'GET',
    url: '/:bookUid',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_books']).check
    ],
    handler: new BooksCtrl().getBook
  })

  fastify.route({
    method: 'PATCH',
    url: '/:bookUid/cancel',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_book_cancel']).check
    ],
    handler: new BooksCtrl().cancel
  })

  fastify.route({
    method: 'GET',
    url: '/registered',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_books_registered']).check
    ],
    handler: new BooksCtrl().getBooksRegistered
  })

  fastify.route({
    method: 'GET',
    url: '/providers',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_get_books_registered']).check
    ],
    handler: new BooksCtrl().getProviders
  })

  fastify.route({
    method: 'GET',
    url: '/export',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_export_books']).check
    ],
    handler: new BooksCtrl().exportBooks
  })

  fastify.route({
    method: 'GET',
    url: '/registered/export',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_export_books']).check
    ],
    handler: new BooksCtrl().exportBooksRegistered
  })

  fastify.route({
    method: 'PATCH',
    url: '/:bookUid/return-provider',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken,
      new PermissionMiddleware(['vehicle_cert_book_return_provider']).check
    ],
    handler: new BooksCtrl().returnProvider
  })

  fastify.route({
    method: 'GET',
    url: '/expired',
    handler: new BooksCtrl().expired
  })

  done();
};