import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class VehicleCertAppCerts extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  requestCancel = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const reqCancelResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.cert.request_cancel.routing',
      message: {
        params: req.body
      }
    })

    return reqCancelResult;
  }

  requestRefund = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const reqRefundResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.cert.request_refund.routing',
      message: {
        params: req.body
      }
    })

    return reqRefundResult;
  }

  requestReportLost = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const reqReportLostResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.cert.request_report_lost.routing',
      message: {
        params: req.body
      }
    })

    return reqReportLostResult;
  }

  checkCompleteFundTrans = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const reqReportLostResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.cert.check_complete_fund_trans.routing',
      message: {
        params: req.params
      }
    })

    return reqReportLostResult;
  }
}