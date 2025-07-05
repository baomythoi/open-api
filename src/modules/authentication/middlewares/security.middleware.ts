import { FastifyRequest, FastifyReply } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

// service
import RSAService from '@authentication/services/rsa.service';

export default class SecurityMiddleware {
  encryptData = async (req: FastifyRequest, reply: FastifyReply, payload: any) => {
    const xApiClient = req.headers['x-api-client'];
    if (!xApiClient) return;

    const dataEncrypt = await RSAService.encrypt({
      clientCode: xApiClient,
      data: JSON.parse(payload)
    })

    reply.header('x-api-secret', dataEncrypt.data.xApiSecret)
    reply.header('x-api-key', dataEncrypt.data.xApiKey)

    return JSON.stringify({
      xdata: dataEncrypt.data.xdata
    })
  }

  decyptData = async (req: FastifyRequest, reply: FastifyReply): Promise<FuncResponse<object>> => {
    const xApiClient = req.headers['x-api-client']
    if (!xApiClient)
      return reply.code(400).send({
        statusCode: 400,
        success: false,
        code: 'x_api_client_is_null',
        message: 'Không lấy được thông tin x-api-client'
      })

    const xApiSecret = req.headers['x-api-secret']
    if (!xApiSecret)
      return reply.code(400).send({
        statusCode: 400,
        success: false,
        code: 'x_api_secret_is_null',
        message: 'Không lấy được thông tin x-api-secret'
      })

    const xApiKey = req.headers['x-api-key']
    if (!xApiKey)
      return reply.code(400).send({
        statusCode: 400,
        success: false,
        code: 'x_api_key_is_null',
        message: 'Không lấy được thông tin x-api-key'
      })

    const decyptDataResult = await RSAService.decryptData({
      xApiClient,
      xApiSecret,
      xApiKey
    }, req.body)
    if (!decyptDataResult.success)
      return reply.code(400).send(decyptDataResult)

    req.body = decyptDataResult.data

    return decyptDataResult
  }

  signingData = async (req: FastifyRequest, reply: FastifyReply, payload: any) => {
    const xApiClient = req.headers['x-api-client'];
    if (!xApiClient) return;

    const signingResult = await RSAService.signing({
      clientCode: xApiClient,
      data: JSON.parse(payload)
    })

    return JSON.stringify({
      xdata: signingResult.data.xdata,
      signature: signingResult.data.signature
    });
  }

  verificationData = async (req: FastifyRequest, reply: FastifyReply): Promise<FuncResponse<object>> => {
    const xApiClient = req.headers['x-api-client']
    if (!xApiClient)
      return reply.code(400).send({
        statusCode: 400,
        success: false,
        code: 'x_api_client_is_null',
        message: 'Không lấy được thông tin x-api-client'
      })

    const verificationResult = await RSAService.verifycation(xApiClient, req.body);
    if (!verificationResult.success)
      return reply.code(400).send(verificationResult);

    req.body = verificationResult.data;

    return verificationResult;
  }
}