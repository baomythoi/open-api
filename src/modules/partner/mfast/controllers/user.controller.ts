import BaseController from '@core/base.controller';

import { FastifyRequest } from 'fastify';

// interface
import {
  LoginParams
} from '@interfaces/authentication/user';
import { FuncResponse } from '@interfaces/response';

// service
import UserSerivce from '@authentication/services/user.service';

export default class MfastUser extends BaseController {
  constructor() {
    super();
  }

  login = async (req: FastifyRequest<{ Body: LoginParams }>): Promise<FuncResponse<object>> => {
    const loginResult = await UserSerivce.login(req.body);

    return loginResult;
  }
}