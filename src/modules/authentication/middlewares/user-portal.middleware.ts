import { FastifyRequest, FastifyReply } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

// service
import UserPortalSerivce from '@authentication/services/user-portal.service';

export default class UserPortalMidleware {
  verifyToken = async (req: FastifyRequest, reply: FastifyReply): Promise<FuncResponse<object>> => {
    const bearerToken = req.headers['authorization'];
    if (!bearerToken)
      return reply.code(401).send({
        statusCode: 401,
        success: false,
        code: 'authorization_token_is_null',
        message: 'Không lấy được thông tin Authorization'
      })

    const accessToken = bearerToken.split(' ')[1];

    const verifyTokenResult = await UserPortalSerivce.verifyToken(accessToken);
    if (!verifyTokenResult.success || !verifyTokenResult.data)
      return reply.code(401).send(verifyTokenResult);

    req.authentication.username = verifyTokenResult.data.username;
    req.authentication.clientType = 'portal';

    return verifyTokenResult;
  }
}