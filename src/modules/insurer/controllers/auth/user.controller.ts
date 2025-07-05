import BaseController from '@core/base.controller';

import { FastifyRequest } from 'fastify';

// interface
import {
  LoginParams
} from '@interfaces/authentication/user';
import { FuncResponse } from '@interfaces/response';

// service
import UserPortalSerivce from '@authentication/services/user-portal.service';

export default class InsurerUser extends BaseController {
  constructor() {
    super();
  }

  login = async (req: FastifyRequest<{ Body: LoginParams }>): Promise<FuncResponse<object>> => {
    const loginResult = await UserPortalSerivce.login(req.body);

    return loginResult;
  }
}