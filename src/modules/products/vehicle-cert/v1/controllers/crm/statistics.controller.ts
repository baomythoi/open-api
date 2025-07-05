import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class VehicleCerts extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  getStatistics = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getStatisticsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.cert.get_statistics.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return getStatisticsResult;
  }
}