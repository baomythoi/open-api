import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Settings extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  init = async (): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.generals.init_settings.routing',
      message: {}
    });

    return result;
  }

  get = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.generals.get_settings.routing',
      message: {
        authentication: req.authentication,
      }
    });

    return result;
  }

  update = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.generals.update_setting.routing',
      message: {
        authentication: req.authentication,
        params: req.body,
      }
    });

    return result;
  }
}