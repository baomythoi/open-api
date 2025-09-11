import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';
import CloudflareR2 from '@utils/cloudflare-r2';
import path from 'path';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Scenarios extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  getAll = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.get_all.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  create = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.create.routing',
      message: {
        authentication: req.authentication,
        params: req.body,
      }
    });

    return result;
  }

  update = async (req: FastifyRequest<{
    Params: {
      scenarioUid: string;
    },
    Body: {
      name?: string;
      description?: string;
      isActive?: boolean;
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.update.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params,
          ...req.body,
        }
      }
    });

    return result;
  }

  getOne = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.get_by_id.routing',
      message: {
        authentication: req.authentication,
        params: req.params
      }
    });

    return result;
  }

  setActiveStatus = async (req: FastifyRequest<{
    Params: {
      scenarioUid: string
    },
    Body: {
      active: boolean
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.set_active_status.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params,
          ...req.body
        }
      }
    });

    return result;
  }

  softDelelte = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.soft_delete.routing',
      message: {
        authentication: req.authentication,
        params: req.params
      }
    });

    return result;
  }

  restore = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.restore.routing',
      message: {
        authentication: req.authentication,
        params: req.params
      }
    });

    return result;
  }

  userGet = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.user_get.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  userCreate = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.user_create.routing',
      message: {
        authentication: req.authentication,
        params: req.body,
      }
    });

    return result;
  }

  userUpdate = async (req: FastifyRequest<{
    Params: {
      stepUid: string;
    },
    Body: {
      question?: string;
      answer?: string;
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.user_update.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params,
          ...req.body,
        },
      }
    });

    return result;
  }

  userDelete = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.user_delete.routing',
      message: {
        authentication: req.authentication,
        params: req.params,
      }
    });

    return result;
  }

  userSetActive = async (req: FastifyRequest<{
    Params: {
      stepUid: string
    },
    Body: {
      active: boolean
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.user_set_active.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params,
          ...req.body,
        }
      }
    });

    return result;
  }

  userUploadExcel = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const file = await req.file();

    if (!file) {
      return {
        statusCode: 400,
        success: false,
        message: 'Chưa có file upload',
      };
    }

    if (
      file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      file.mimetype !== 'application/vnd.ms-excel'
    ) {
      return {
        statusCode: 400,
        success: false,
        message: 'Chỉ được upload file Excel',
      };
    }

    const ext = path.extname(file.filename);
    const baseName = path.basename(file.filename, ext);
    const filename = `scenarios/${req.authentication.username}/${baseName}-${Date.now()}${ext}`;

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
      data: {
        originalName: file.filename,
        savedAs: filename,
        url: (result.data as any).url,
      },
    };
  };

  userUploadedExcelHandler = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.scenarios.user_uploaded_excel_handler.routing',
      message: {
        authentication: req.authentication,
        params: req.body,
      }
    });

    return result;
  }
}