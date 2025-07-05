import { FastifyRequest, FastifyReply } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

// service
import PermissionService from '@authorization/services/permission.service';

export default class PermissionMiddleware {
  protected requiredPermissions: string[];

  constructor(requiredPermissions: string[]) {
    this.requiredPermissions = requiredPermissions;
  }

  check = async (req: FastifyRequest, reply: FastifyReply): Promise<FuncResponse<object>> => {
    const checkResult = await PermissionService.check({ requiredPermissions: this.requiredPermissions }, req.authentication);
    if (!checkResult.success)
      return reply.code(403).send(checkResult);

    return checkResult;
  }
}