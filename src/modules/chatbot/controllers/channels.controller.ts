import BaseController from '@core/base.controller';
import { FastifyReply, FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Channels extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  getPages = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.get_pages.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  deletePage = async (req: FastifyRequest<{
    Params: { pageUid: string }, 
    Querystring: { platform: string },
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.delete_page.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params,
          ...req.query
        },
      }
    });

    return result;
  }
}