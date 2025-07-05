import { FastifyRequest } from 'fastify';
import { CustomError } from '@errors/custom';
import { ErrorCodes } from '@enums/error-code';

export default new class WhiteList {
  private allowedOrigins = [
    'globalcare.vn',
    'globalcare.com.vn'
  ]

  origins = async (req: FastifyRequest) => {
    const origin = req.headers.origin || req.headers.referer || '';
    let host = '';
    if (origin)
      host = new URL(origin).hostname;

    /** support localhost on development */
    const NODE_ENV = process.env.NODE_ENV || '';
    if (['local', 'development'].includes(NODE_ENV) && ['localhost', '127.0.0.1'].includes(host)) {
      return true;
    }

    const isAllowed = this.allowedOrigins.some((site) => host.endsWith(site));
    if (!isAllowed)
      throw new CustomError(ErrorCodes.FORBIDDEN);

    return true;
  }
}