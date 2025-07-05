import BaseService from "@core/base.service";

// interface
import { FuncResponse } from '@interfaces/response';
import { Authentication } from '@interfaces/authentication/user';

export default new class SubscribeApiService extends BaseService {
  protected defaultExchange = 'rpc.service.insurer.exchange';

  constructor() {
    super();
  }

  async subscribe(params: any, authentication: Authentication): Promise<FuncResponse<any>> {
    const message = {
      params,
      authentication
    }

    const subscribeResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.insurer.product_hub.api.subscribe.routing',
      message
    });

    return subscribeResult;
  }

  async unSubscribe(params: any, authentication: Authentication): Promise<FuncResponse<any>> {
    const message = {
      params,
      authentication
    }

    const unSubscribeResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.insurer.product_hub.api.unsubscribe.routing',
      message
    });

    return unSubscribeResult;
  }

  async subscribeList(params: any, authentication: Authentication): Promise<FuncResponse<any>> {
    const message = {
      params,
      authentication
    }

    const subscribeListResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.insurer.product_hub.api.subscribe_list.routing',
      message
    });

    return subscribeListResult;
  }
}