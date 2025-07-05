import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class VehicleCertWebRegisteredCerts extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  getListProviderCert = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const listProvidersResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.providers_cert.routing',
      message: {
        authentication: req.authentication,
        params: req.params
      }
    })

    return listProvidersResult;
  }

  getFeesCert = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const registerResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.get_fees.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return registerResult;
  }

  rigisteredCert = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const registerResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.rigistered_cert.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return registerResult;
  }

  getProfileUser = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const registerResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.rigistered_profile_user.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return registerResult;
  }

  certListRegister = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const certOldSeriResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.vehicle_cert_list_register.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return certOldSeriResult;
  }
}