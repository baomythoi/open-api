import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Prompts extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  userGet = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompts.user_get.routing',
      message: {
        authentication: req.authentication,
      }
    });

    return result;
  }

  userGetOne = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompts.user_get_one.routing',
      message: {
        authentication: req.authentication,
        params: req.params,
      }
    });

    return result;
  }

  userCreate = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompts.user_create.routing',
      message: {
        authentication: req.authentication,
        params: req.body,
      }
    });

    return result;
  }

  userUpdate = async (req: FastifyRequest<{
    Params: {
      promptUid: string;
    },
    Body: {
      name?: string;
      content?: string;
      type?: 'system_prompt' | 'classify_prompt';
      isActive?: boolean;
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompts.user_update.routing',
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

  userDelete = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompts.user_delete.routing',
      message: {
        authentication: req.authentication,
        params: req.params,
      }
    });

    return result;
  }
}