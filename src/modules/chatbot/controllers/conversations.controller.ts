import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class ConversationController extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  getList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.conversations.get_list.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  getDetail = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.conversations.get_detail.routing',
      message: {
        authentication: req.authentication,
        params: req.params,
      }
    });

    return result;
  }

  manualEndConversation = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.conversations.manual_end.routing',
      message: {
        authentication: req.authentication,
        params: req.params,
      }
    });

    return result;
  }
}