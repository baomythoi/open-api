import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class FamilyCareOrder extends BaseController {
  protected exchange = 'rpc.service.partner.mfast.exchange';

  constructor() {
    super();
  }

  paymentCallback = async (req: FastifyRequest<{
    Params: {
      orderCode: string;
    };
    Body: {
      paymentCode: string;
      paymentStatus: string;
    }
  }>): Promise<FuncResponse<object>> => {
    const updatePaymentResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.partner.mfast.family_accident_payment_callback.routing',
      message: {
        params: {
          ...req.params,
          ...req.body
        }
      }
    })

    return updatePaymentResult;
  }

  pushCertificate = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    this.pushToWorker({
      exchange: 'worker.service.partner.mfast.exchange',
      routing: 'worker.partner.mfast.re_push_order.routing',
      message: {
        params: req.params
      }
    })

    return this.responseSuccess();
  }
}