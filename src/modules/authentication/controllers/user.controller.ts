import BaseController from '@core/base.controller';

import { CustomError } from '@errors/custom';

import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

// service

export default class UserController extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  profile = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.user.account.profile.routing',
      message: {
        authentication: req.authentication,
      }
    })

    return result;
  }
}