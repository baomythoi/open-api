import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

// routes

export default class PromptTemplateCategories extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  getList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_template_categories.get_list.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }

  getDetail = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_template_categories.get_detail.routing',
      message: {
        params: req.params,
      }
    });

    return result;
  }

  create = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_template_categories.create.routing',
      message: {
        params: req.body,
      }
    });

    return result;
  }

  update = async (req: FastifyRequest<{
    Params: {
      categoryUid: string;
    },
    Body: {
      name?: string;
      description?: string;
      icon?: string;
      order?: number;
      isActive?: boolean;
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_template_categories.update.routing',
      message: {
        params: {
          ...req.params,
          ...req.body,
        },
      }
    });

    return result;
  }

  setStatus = async (req: FastifyRequest<{
    Params: {
      templateUid: string
    },
    Body: {
      isActive: boolean
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_template_categories.set_status.routing',
      message: {
        params: {
          ...req.params,
          ...req.body
        }
      }
    });

    return result;
  }

  delete = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_template_categories.delete.routing',
      message: {
        params: req.params,
      }
    });

    return result;
  }

  getAllActiveCategories = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_template_categories.get_all_active.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }
}