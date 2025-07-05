import BaseService from "@core/base.service";

// interface
import { FuncResponse } from '@interfaces/response';
import { Authentication } from '@interfaces/authentication/user';

export default new class InsurerPBPService extends BaseService {
  protected defaultExchange = 'rpc.service.products_hub.exchange';

  constructor() {
    super();
  }

  async list(params: any, authentication: Authentication): Promise<FuncResponse<any>> {
    const message = {
      params,
      authentication
    }

    const listResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products_hub.pbp.get_list.routing',
      message
    });

    return listResult;
  }
}