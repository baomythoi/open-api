import { FastifyRequest } from 'fastify';
import BaseController from '@core/base.controller';

// service
import G2Serivce from '@g2/services';

// interface
import { FuncResponse } from '@interfaces/response';
import {
  UploadFileParams
} from '@interfaces/g2/upload.interface';

export default class Product extends BaseController {
  constructor() {
    super();
  }

  uploadPrivateId = async (req: FastifyRequest<{ Body: UploadFileParams }>): Promise<FuncResponse<object>> => {
    try {
      const uploadResult = await G2Serivce.upload({
        path: `/user/${req.authentication.username}/private-id`,
        file: await req.body.file.toBuffer(),
        filename: req.body.file.filename,
        mimetype: req.body.file.mimetype,
        storage: 's3'
      });

      return uploadResult;
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  uploadSignature = async (req: FastifyRequest<{ Body: UploadFileParams }>): Promise<FuncResponse<object>> => {
    try {
      const uploadResult = await G2Serivce.upload({
        path: `/user/${req.authentication.username}/signature`,
        file: await req.body.file.toBuffer(),
        filename: req.body.file.filename,
        mimetype: req.body.file.mimetype,
        storage: 's3'
      });

      return uploadResult;

    } catch (error: any) {
      return this.responseError(error);
    }
  }
}