import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Statistics extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  // User controllers
  getConfigs = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.feedbacks.get_configs.routing',
      message: {
        authentication: req.authentication,
      }
    });

    return result;
  }

  submitFeedback = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.feedbacks.submit_feedback.routing',
      message: {
        authentication: req.authentication,
        params: req.body,
      }
    });

    return result;
  }

  // admin controllers
  adminGetConfigs = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.feedbacks.admin_get_configs.routing',
      message: {
        authentication: req.authentication,
      }
    });

    return result;
  }

  adminGetList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.feedbacks.admin_get_list.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }
}