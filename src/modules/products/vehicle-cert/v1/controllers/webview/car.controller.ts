import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class VehicleCertWebCar extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  getCarTypes = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getProvidersResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.cert.get_car_types.routing',
      message: {
        params: {}
      }
    })

    return getProvidersResult;
  }

  getCarTypeDetail = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getProvidersResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.cert.get_car_type.routing',
      message: {
        params: {
          ...req.params as Record<string, any>,
          ...req.query as Record<string, any>
        }
      }
    })

    return getProvidersResult;
  }
}