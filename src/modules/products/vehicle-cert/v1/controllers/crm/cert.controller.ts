import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class VehicleCerts extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  getCerts = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getCertsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.get_list.routing',
      message: {
        params: req.query
      }
    })

    return getCertsResult;
  }

  confirmAgentReturn = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const agentReturnResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.confirm_agent_return.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return agentReturnResult;
  }

  confirmReturnToProvider = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const returnToProviderResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.confirm_return_to_provider.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return returnToProviderResult;
  }

  confirmAgentCancel = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const agentCancelResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.confirm_agent_cancel.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params as Record<string, any>,
          ...req.body as Record<string, any>
        }
      }
    })

    return agentCancelResult;
  }

  getCert = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getCertResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.get.routing',
      message: {
        params: req.params
      }
    })

    return getCertResult;
  }

  getStatus = async (): Promise<FuncResponse<object>> => {
    const getStatusResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.get_status.routing',
      message: {
        params: {}
      }
    })

    return getStatusResult;
  }

  motorCompleteUse = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const completeUseResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.motorbike_complete_use.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return completeUseResult;
  }

  carCompleteUse = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const completeUseResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.car_complete_use.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return completeUseResult;
  }

  exportCerts = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const exportCertResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.export.routing',
      message: {
        params: req.query
      }
    })

    return exportCertResult;
  }

  manualCommissionPayout = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const exportCertResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.commission.manual_payout.routing',
      message: {
        params: req.params
      }
    })

    return exportCertResult;
  }

  confirmAgentReject = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const agentCancelResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.confirm_agent_reject.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return agentCancelResult;
  }
}

