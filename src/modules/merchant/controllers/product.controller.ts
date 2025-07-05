import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Product extends BaseController {
  protected exchange = 'rpc.service.merchant.exchange';

  constructor() {
    super();
  }

  getPBPList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const pbpResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.merchant.get_products.routing',
      message: {
        authentication: req.authentication,
        params: {}
      }
    });

    return pbpResult;
  }

  getOrders = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const ordersResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.merchant.get_orders.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    });

    return ordersResult;
  }

  exportOrders = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const ordersResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.merchant.export_orders.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    });

    return ordersResult;
  }

  getDashBoard = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const dashboardResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.merchant.get_dashboard.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    });

    return dashboardResult;
  }
}