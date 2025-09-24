import BaseController from '@core/base.controller';
import { CustomError } from '@errors/custom';
import { FastifyRequest } from 'fastify';

import CloudflareR2 from '@utils/cloudflare-r2';
import path from 'path';

// interface
import { FuncResponse } from '@interfaces/response';

// service

export default class UserController extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  profile = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.user.account.profile.routing',
      message: {
        authentication: req.authentication,
      }
    })

    return result;
  }

  update = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.user.account.update.routing',
      message: {
        authentication: req.authentication,
        params: req.body,
      }
    })

    return result;
  }

  uploadAvatar = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const file = await req.file();

    if (!file) {
      return {
        statusCode: 400,
        success: false,
        message: 'Chưa có file upload',
      };
    }

    if (!file.mimetype.startsWith('image/')) {
      return {
        statusCode: 400,
        success: false,
        message: 'Chỉ được upload file ảnh',
      };
    }

    const ext = path.extname(file.filename);
    const filename = `avatars/users/${req.authentication.username}/avatar${ext}`;

    const result = await CloudflareR2.uploadFile(filename, file.file, file.mimetype);

    if (!result.success) {
      return {
        statusCode: 500,
        success: false,
        message: result.message || 'Upload thất bại',
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: 'Upload thành công',
      data: { path: filename },
    };
  };

  manualAssignPackage = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.user.account.manual_assign_package.routing',
      message: {
        authentication: req.authentication,
        params: req.body,
      }
    })

    return result;
  }
}