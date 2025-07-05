import BaseController from "@core/base.controller";

import { FastifyRequest } from 'fastify';

// service
import RSAService from '@authentication/services/rsa.service';

export default class RSAController extends BaseController {
  constructor() {
    super()
  }

  register = async (req: FastifyRequest) => {
    const regResult = await RSAService.register(req.body, req.authentication)

    return regResult
  }

  encrypt = async (req: FastifyRequest) => {
    const encryptResult = await RSAService.encrypt(req.body)

    return encryptResult
  }

  decrypt = async (req: FastifyRequest) => {
    const xApiClient = req.headers['x-api-client'] || ''
    const xApiSecret = req.headers['x-api-secret'] || ''
    const xApiKey = req.headers['x-api-key'] || ''

    const decryptResult = await RSAService.decryptData({
      xApiClient,
      xApiKey,
      xApiSecret,
      example: true
    }, req.body)

    return decryptResult;
  }

  createMD5Code = async (req: FastifyRequest) => {
    const generateMD5Result = await RSAService.createMD5(req.body);

    return generateMD5Result;
  }

  signing = async (req: FastifyRequest) => {
    const signingResult = await RSAService.signing(req.body)

    return signingResult;
  }

  verification = async (req: FastifyRequest) => {
    const xApiClient = req.headers['x-api-client'] || '';

    const verificationResult = await RSAService.verifycation(xApiClient, req.body);

    return verificationResult;
  }
}