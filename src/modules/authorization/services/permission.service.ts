import BaseService from "@core/base.service";

// interface
import { FuncResponse } from '@interfaces/response';
import { Authentication } from '@interfaces/authentication/user';

export default new class Permission extends BaseService {
  protected defaultExchange = 'rpc.service.authorization.exchange';

  constructor() {
    super();
  }

  assignToRole = async (params: any): Promise<FuncResponse<object>> => {
    const message = {
      params
    }

    const assignResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authorization.permission.assign_role.routing',
      message
    });

    return assignResult;
  }

  check = async (params: any, authentication: Authentication): Promise<FuncResponse<object>> => {
    const message = {
      params,
      authentication
    }

    const checkResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authorization.permission.check.routing',
      message
    });

    return checkResult;
  }
}