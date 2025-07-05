import { FastifyRequest, FastifyReply } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

// service
import UserSerivce from '@authentication/services/user.service';

export default class UserMidleware {
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

    const verifyTokenResult = await UserSerivce.verifyToken(accessToken);
    if (!verifyTokenResult.success || !verifyTokenResult.data)
      return reply.code(401).send(verifyTokenResult);

    req.authentication.username = verifyTokenResult.data.username;

    return verifyTokenResult;
  }

  verify = async (req: FastifyRequest, reply: FastifyReply): Promise<FuncResponse<object>> => {
    const bearerToken = req.headers['authorization'];
    if (!bearerToken)
      return reply.code(401).send({
        statusCode: 401,
        success: false,
        code: 'authorization_token_is_null',
        message: 'Không lấy được thông tin Authorization'
      })

    const accessToken = bearerToken.split(' ')[1];

    const verifyResult = await UserSerivce.verify(accessToken);
    if (!verifyResult.success || !verifyResult.data)
      return reply.code(401).send(verifyResult);

    req.authentication.username = verifyResult.data.username;

    return verifyResult;
  }
}