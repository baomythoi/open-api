import BaseController from '@core/base.controller';

import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';
import { PBPItem } from '@interfaces/products-hub/pbp';

// service
import InsurerPBPService from '@insurer/services/products-hub/pbp.service';

export default class InsurerPBP extends BaseController {
  constructor() {
    super();
  }

  productList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const listResult = await InsurerPBPService.list(req.query, req.authentication)
    if (!listResult.success)
      return listResult

    const customData = listResult.data.pbp.map((item: PBPItem) => {
      return {
        providerCode: item.providerCode,
        insuranceType: item.productCode,
        productCode: item.code,
        productTitle: item.productTitle
      }
    })

    listResult.data = {
      results: customData,
      total: listResult.data.total
    }

    return listResult
  }
}