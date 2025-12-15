import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class PackagesController extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  adminGetList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.packages.get_list.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  adminGetDetail = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.packages.get_detail.routing',
      message: {
        params: req.params,
      }
    });

    return result;
  }

  adminCreate = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.packages.create.routing',
      message: {
        params: req.body,
      }
    });

    return result;
  }

  adminUpdate = async (req: FastifyRequest<{
    Params: {
      packageUid: string;
    },
    Body: {
      code: string;
      name: string;
      durationMonths: number;
      price: number;
      quotaMessages: number;
      extraPricePer1000: number;
  }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.packages.update.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params,
          ...req.body,
        },
      }
    });

    return result;
  }

  adminUpdateStatus = async (req: FastifyRequest<{
    Params: {
      packageUid: string;
    },
    Body: {
      isActive: boolean;
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.packages.update_status.routing',
      message: {
        params: {
          ...req.params,
          ...req.body,
        },
      }
    });

    return result;
  }

  adminGetMetrics = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.packages.get_metrics.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  adminDelete = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.packages.delete.routing',
      message: {
        params: req.params,
      }
    });

    return result;
  }
}