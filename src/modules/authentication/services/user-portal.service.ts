import BaseService from "@core/base.service";

// interface
import { FuncResponse } from '@interfaces/response';
import { LoginParams } from '@interfaces/authentication/user';

export default new class UserPortalService extends BaseService {
  protected defaultExchange = 'rpc.service.authentication.exchange';

  constructor() {
    super();
  }

  async login(params: LoginParams): Promise<FuncResponse<{ accessToken: string }>> {
    const message = {
      params: {
        ...params.credentials,
        expiredIn: '1d'
      }
    }

    const loginResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.user_portal.get_token.routing',
      message,
    });

    return loginResult;
  }

  async verifyToken(accessToken: string): Promise<FuncResponse<any>> {
    const message = {
      params: {
        accessToken
      }
    }

    const verifyTokenResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.user_portal.verify_token.routing',
      message
    });

    return verifyTokenResult;
  }
}

