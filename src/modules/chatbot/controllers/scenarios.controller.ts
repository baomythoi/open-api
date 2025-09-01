import BaseController from '@core/base.controller';
import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
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
    const filename = `${baseName}-${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);

    await new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(filePath);
      file.file.pipe(ws);
      ws.on('finish', resolve);
      ws.on('error', reject);
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Upload thành công',
      data: {
        originalName: file.filename,
        savedAs: filename,
        path: filePath,
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

  downloadTemplate = async (req: FastifyRequest, reply: FastifyReply) => {
    const { locale } = req.query as { locale?: string };

    const lang = (!locale || locale === 'en') ? 'en' : 'vi';

    const templateFile = path.resolve(
      __dirname,
      '../../../templates/scenarios',
      `scenario_template_${lang}.xlsx`
    );

    if (!fs.existsSync(templateFile)) {
      return reply.code(404).send({
        statusCode: 404,
        success: false,
        message: 'Template file not found',
        data: null,
        code: 'TEMPLATE_NOT_FOUND',
      });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    reply.raw.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    reply.raw.setHeader(
      'Content-Disposition',
      `attachment; filename="scenario_template_${lang}_${timestamp}.xlsx"`
    );

    fs.createReadStream(templateFile).pipe(reply.raw);
    return reply;
  };
}