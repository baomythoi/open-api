import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import RegisteredCertCtl from '@products/vehicle-cert/v2/controllers/web/rigistered.controller'

import CertCtl from '@products/vehicle-cert/v2/controllers/web/cert.controller'

// middleware
import UserMiddleware from '@authentication/middlewares/user.middleware';
import WebviewMiddleware from '@authentication/middlewares/webview.middleware';


export default (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify.route({
    method: 'GET',
    url: '/providers-cert',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new RegisteredCertCtl().getListProviderCert
  })
  
  fastify.route({
    method: 'POST',
    url: '/fees-cert',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new RegisteredCertCtl().getFeesCert
  })

  fastify.route({
    method: 'POST',
    url: '/rigistered-cert',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new RegisteredCertCtl().rigisteredCert
  })

  fastify.route({
    method: 'GET',
    url: '/profile-user',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new RegisteredCertCtl().getProfileUser
  })

  fastify.route({
    method: 'GET',
    url: '/cert-stats',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new CertCtl().getCertStats
  })
  
  fastify.route({
    method: 'GET',
    url: '/cert-list',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new CertCtl().getListCerts
  })

  fastify.route({
    method: 'GET',
    url: '/cert-detail/:uid',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new CertCtl().getDetailCerts
  })

  fastify.route({
    method: 'GET',
    url: '/cert-code',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new CertCtl().getCertCode
  })
  
  fastify.route({
    method: 'POST',
    url: '/cert-activate-lated',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new CertCtl().activateCertLated
  })
  
  fastify.route({
    method: 'POST',
    url: '/cert-activate',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new CertCtl().activateCert
  })
  
  fastify.route({
    method: 'POST',
    url: '/cert-check-seri',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new CertCtl().certCheckSeri
  })
  
  fastify.route({
    method: 'POST',
    url: '/cert-request-edit',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new CertCtl().certRequestEdit
  })
  
  fastify.route({
    method: 'GET',
    url: '/cert-old-seri',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new CertCtl().certOldSeri
  })
  
  fastify.route({
    method: 'GET',
    url: '/check-not-use',
    handler: new CertCtl().checkCertNotUse
  })
  
  fastify.route({
    method: 'GET',
    url: '/cert-list-register',
    preHandler: [
      new WebviewMiddleware().verifyRequest,
      new UserMiddleware().verify,
    ],
    handler: new RegisteredCertCtl().certListRegister
  })

  done();
};