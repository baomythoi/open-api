import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Internal extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  importList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.list_import.routing',
      message: {
        params: req.query
      }
    });
  }

  list = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.list.routing',
      message: {
        params: req.query
      }
    });
  }

  create = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.create.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    });
  }

  config = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.config.routing',
      message: {
        params: req.params
      }
    });
  }

  assign = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.assign.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    });
  }

  detail = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.detail.routing',
      message: {
        authentication: req.authentication,
        params: req.params
      }
    });
  }

  update = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.update.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.body as object,
          ...req.params as object
        }
      }
    });
  }

  reject = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.reject.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.body as object,
          ...req.params as object
        }
      }
    });
  }

  registered = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.registered.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    });
  }

  share = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.share.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    });
  }
}
