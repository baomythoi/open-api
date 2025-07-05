import BaseController from "@core/base.controller";

import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

// service
import SubscribeApiSerivce from '@insurer/services/products-hub/subscribe-api.service';

export default class SubscribeApi extends BaseController {
  constructor() {
    super();
  }

  subscribe = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const subscribeResult = await SubscribeApiSerivce.subscribe(req.body, req.authentication);

    return subscribeResult;
  }

  unSubscribe = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const unSubscribeResult = await SubscribeApiSerivce.unSubscribe(req.body, req.authentication);

    return unSubscribeResult;
  }

  subscribeList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const subscribeListResult = await SubscribeApiSerivce.subscribeList(req.query, req.authentication);

    return subscribeListResult;
  }
}