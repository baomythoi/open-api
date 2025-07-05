import { FastifyRequest, FastifyReply } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

// service
import PBPService from '@productsHub/services/pbp.service';

export default class PBPMiddleware {
  verifyProduct = async (req: FastifyRequest, reply: FastifyReply): Promise<FuncResponse<object>> => {
    const verifyResult = await PBPService.verify(req.body, req.authentication);
    if (!verifyResult.success)
      return reply.code(404).send(verifyResult);

    return verifyResult;
  }
}