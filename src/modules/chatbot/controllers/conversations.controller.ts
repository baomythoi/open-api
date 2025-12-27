import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class ConversationController extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  // User Controllers
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

  getMessages = async (req: FastifyRequest<{
    Params: {
      conversationUid: string
    },
    Querystring: {
      page: number,
      pageSize: number,
    },
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.conversations.get_messages.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.query,
          ...req.params,
        }
      }
    });

    return result;
  }

  getStats = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.conversations.get_stats.routing',
      message: {
        authentication: req.authentication,
      }
    });

    return result;
  }

  // Admin Controllers
  adminGetList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.conversations.admin_get_list.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }

  adminGetDetail = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.conversations.admin_get_detail.routing',
      message: {
        params: req.params,
      }
    });

    return result;
  }

  adminGetMessages = async (req: FastifyRequest<{
    Params: {
      conversationUid: string
    },
    Querystring: {
      page: number,
      pageSize: number,
    },
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.conversations.admin_get_messages.routing',
      message: {
        params: {
          ...req.query,
          ...req.params,
        }
      }
    });

    return result;
  }

  adminGetStats = async (): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.conversations.admin_get_stats.routing',
      message: {}
    });

    return result;
  }
}