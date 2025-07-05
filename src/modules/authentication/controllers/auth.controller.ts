import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { LoginParams, Register } from '@interfaces/authentication/user';
import { FuncResponse } from '@interfaces/response';

export default class Authentication extends BaseController {
  protected exchange = 'rpc.service.authentication.exchange';

  constructor() {
    super();
  }

  login = async (req: FastifyRequest<{ Body: LoginParams }>): Promise<FuncResponse<object>> => {
    const loginResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.authentication.user.get_token.routing',
      message: {
        params: req.body.credentials
      }
    })

    return loginResult;
  }

  checkExist = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const checkExistResult = await this.postMessages({
      exchange: 'rpc.service.affiliate.exchange',
      routing: 'rpc.aff.user.account.check_exist.routing',
      message: {
        params: req.body
      }
    })

    return checkExistResult;
  }

  register = async (req: FastifyRequest<{ Body: Register }>): Promise<FuncResponse<object>> => {
    const registerResult = await this.postMessages({
      exchange: 'rpc.service.chatbot.exchange',
      routing: 'rpc.chatbot.user.account.register.routing',
      message: {
        params: req.body,
      }
    })

    return registerResult;
  }
}
