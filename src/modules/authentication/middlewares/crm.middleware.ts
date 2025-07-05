import { FastifyRequest, FastifyReply } from 'fastify';

// controller
import SecurityCtrl from '@mc/controllers/security.controller';

export default class AppMiddleware {
  verifyRequest = async (req: FastifyRequest, reply: FastifyReply) => {
    if (process.env.NODE_ENV === 'local') return;

    const xApiStime = req.headers['x-api-stime'];
    if (!xApiStime)
      return reply.code(403).send({
        statusCode: 403,
        success: false,
        code: 'x_api_stime_is_null',
        message: 'Không lấy được thông tin x-api-stime'
      })

    const xApiNonce = req.headers['x-api-nonce'];
    if (!xApiNonce)
      return reply.code(403).send({
        statusCode: 403,
        success: false,
        code: 'x_api_nonce_is_null',
        message: 'Không lấy được thông tin x-api-nonce'
      })

    const xApiClient = req.headers['x-api-client'];

    let data;
    if (req.query && Object.keys(req.query).length)
      data = req.query;

    if (req.body && Object.keys(req.body).length)
      data = req.body;

    const verifyResult = await new SecurityCtrl().verifyRequest({
      mcCode: 'CRM',
      xApiStime,
      xApiNonce,
      xApiClient,
      data,
    });
    if (!verifyResult.success)
      return reply.code(403).send(verifyResult);

    return verifyResult;
  }
}