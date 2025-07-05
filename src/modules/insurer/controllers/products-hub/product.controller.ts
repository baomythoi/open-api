import BaseController from '@core/base.controller';

import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

// service
import InsurerProductService from '@insurer/services/products-hub/product.service';

export default class InsurerProduct extends BaseController {
  constructor() {
    super();
  }

  productList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const list = await InsurerProductService.list(req.query, req.authentication)

    return list
  }
}