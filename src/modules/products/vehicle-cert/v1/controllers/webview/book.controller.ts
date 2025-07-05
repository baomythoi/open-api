import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class VehicleCertWebBooks extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  getProviders = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getProvidersResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.book.get_providers.routing',
      message: {
        params: {}
      }
    })

    return getProvidersResult;
  }

  getBooks = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getBooksResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.book.get_list.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return getBooksResult;
  }

  getFees = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getFeesResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.book.get_fees.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return getFeesResult;
  }

  registerBooks = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const registerResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.book.register.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return registerResult;
  }
}

