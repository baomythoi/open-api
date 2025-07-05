import BaseService from "@core/base.service";

// interface
import { FuncResponse } from '@interfaces/response';
import { LoginParams } from '@interfaces/authentication/user';

export default new class UserService extends BaseService {
  protected defaultExchange = 'rpc.service.authentication.exchange';

  constructor() {
    super();
  }

  async login(params: LoginParams): Promise<FuncResponse<{ accessToken: string }>> {
    const message = {
      params: params.credentials
    }

    const loginResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.user.get_token.routing',
      message
    });

    return loginResult;
  }

  async verifyToken(accessToken: string): Promise<FuncResponse<{ username: string }>> {
    const message = {
      params: {
        accessToken
      }
    }

    const verifyTokenResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.user.verify_token.routing',
      message
    });

    return verifyTokenResult;
  }

  async verify(accessToken: string): Promise<FuncResponse<{ username: string }>> {
    const message = {
      params: {
        accessToken
      }
    }

    const verifyResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.user.verify.routing',
      message
    });

    return verifyResult;
  }
}

