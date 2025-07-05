import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';
import { VerifyParams } from '@interfaces/merchant/security';

export default class Security extends BaseController {
  protected exchange = 'rpc.service.merchant.exchange';

  getSecretKey = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const secretKeyResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.merchant.get_secrect_key.routing',
      message: {
        params: req.body
      }
    })

    return secretKeyResult;
  }

  verifyRequest = async (params: VerifyParams): Promise<FuncResponse<object>> => {
    const verifyResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.merchant.verify_request.routing',
      message: {
        params
      }
    })

    return verifyResult;
  }
}