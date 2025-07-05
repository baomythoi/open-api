import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// middleware
import UserPortalMiddleware from '@authentication/middlewares/user-portal.middleware';
import CRMMiddleware from '@authentication/middlewares/crm.middleware';

import vehicleCertV2Controller from "@products/vehicle-cert/v2/controllers/crm";

export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken
    ],
    handler: new vehicleCertV2Controller().create
  });

  fastify.route({
    method: 'GET',
    url: '/import',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken
    ],
    handler: new vehicleCertV2Controller().importList
  });

  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken
    ],
    handler: new vehicleCertV2Controller().list
  });

  fastify.route({
    method: 'GET',
    url: '/config',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken
    ],
    handler: new vehicleCertV2Controller().config
  });

  fastify.route({
    method: 'POST',
    url: '/assign',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken
    ],
    handler: new vehicleCertV2Controller().assign
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken
    ],
    handler: new vehicleCertV2Controller().detail
  });

  fastify.route({
    method: 'POST',
    url: '/:id',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken
    ],
    handler: new vehicleCertV2Controller().update
  });

  fastify.route({
    method: 'POST',
    url: '/:id/reject',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken
    ],
    handler: new vehicleCertV2Controller().reject
  });

  fastify.route({
    method: 'get',
    url: '/registered',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken
    ],
    handler: new vehicleCertV2Controller().registered
  });

  fastify.route({
    method: 'post',
    url: '/share',
    preHandler: [
      new CRMMiddleware().verifyRequest,
      new UserPortalMiddleware().verifyToken
    ],
    handler: new vehicleCertV2Controller().share
  });

  done();
};
