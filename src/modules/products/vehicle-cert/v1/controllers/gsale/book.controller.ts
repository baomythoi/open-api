import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class VehicleCertAppBooks extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  getBooks = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getBooksResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.book.get_list.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return getBooksResult;
  }

  getBook = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getBookResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.book.get.routing',
      message: {
        params: req.params
      }
    })

    return getBookResult;
  }

  getBooksRegistered = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getBooksRegisteredResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.book.get_registered.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return getBooksRegisteredResult;
  }
}