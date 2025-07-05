import { FastifyRequest } from 'fastify';
import { FuncResponse } from '@interfaces/response';
import BaseController from "@core/base.controller";

export default class RenewalController extends BaseController {
  protected exchange = 'rpc.service.renewal.exchange';

  constructor() {
    super();
  }

  getProviders = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const configCreateResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.renewal.crm.provider_get_list.routing',
      message: {
        params: req.body
      }
    })

    return configCreateResult;
  }

  getMerchants = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const configCreateResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.renewal.crm.merchant_get_list.routing',
      message: {
        params: req.body
      }
    })

    return configCreateResult;
  }

  getProducts = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const configCreateResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.renewal.crm.product_get_list.routing',
      message: {
        params: req.body
      }
    })

    return configCreateResult;
  }

  getStatus = async (): Promise<FuncResponse<object>> => {
    const configCreateResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.renewal.crm.status_get_list.routing',
      message: {
        params: {}
      }
    })

    return configCreateResult;
  }

  getRenewals = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const listResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.renewal.crm.renewal_get_list.routing',
      message: {
        params: req.body
      }
    })

    return listResult;
  }

  getRenewal = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const listResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.renewal.crm.renewal_get.routing',
      message: {
        authentication: req.authentication,
        params: req.params
      }
    })

    return listResult;
  }

  noteRepurchase = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const listResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.renewal.crm.renewal_note_repurchase.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return listResult;
  }
}
