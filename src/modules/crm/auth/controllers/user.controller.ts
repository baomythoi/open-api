import { FastifyRequest } from 'fastify';

// interface
import { LoginParams } from '@interfaces/authentication/user';
import { FuncResponse } from '@interfaces/response';

// service
import UserPortalSerivce from '@authentication/services/user-portal.service';

export default class User {
  login = async (req: FastifyRequest<{ Body: LoginParams }>): Promise<FuncResponse<object>> => {
    const loginResult = await UserPortalSerivce.login(req.body);

    return loginResult;
  }
}