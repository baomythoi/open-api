import BaseController from '@core/base.controller';

import { CustomError } from '@errors/custom';

import { FastifyRequest } from 'fastify';

// interface
import {
  LoginParams
} from '@interfaces/authentication/user';
import { FuncResponse } from '@interfaces/response';

// service
import UserSerivce from '@authentication/services/user.service';
import UserPortalSerivce from '@authentication/services/user-portal.service';

export default class UserController extends BaseController {
  constructor() {
    super();
  }

  login = async (req: FastifyRequest<{ Body: LoginParams }>): Promise<FuncResponse<object>> => {
    let loginResult: FuncResponse<object>

    try {
      switch (req.body.clientType) {
        case 'app':
          loginResult = await UserSerivce.login(req.body);
          break;

        case 'portal':
          loginResult = await UserPortalSerivce.login(req.body);
          break;

        default:
          throw new CustomError(this.errorCodes.BAD_REQUEST)
      }

      return loginResult;
    } catch (error: any) {
      return this.responseError(error)
    }
  }
}