import BaseService from "@core/base.service";

// interface
import { FuncResponse } from '@interfaces/response';
import { Authentication } from '@interfaces/authentication/user';

export default new class PBPService extends BaseService {
  protected defaultExchange = 'rpc.service.products_hub.exchange';

  constructor() {
    super();
  }

  async verify(params: any, authentication: Authentication): Promise<FuncResponse<object>> {
    const message = {
      authentication,
      params: {
        productCode: params.productCode,
        pbpCode: params.pbpCode,
      }
    }

    const verifyResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products_hub.pbp.verify.routing',
      message
    });

    return verifyResult;
  }
}