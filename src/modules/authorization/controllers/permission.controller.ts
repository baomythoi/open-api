import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

// service
import PermissionService from '@authorization/services/permission.service';

export default class PermissionController extends BaseController {
  constructor() {
    super();
  }

  assign = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const assignResult = await PermissionService.assignToRole(req.body);

    return assignResult;
  }
}