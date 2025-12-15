import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class PromptTemplates extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  getConfigs = async (): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_templates.get_configs.routing',
      message: {}
    });

    return result;
  }

  getList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_templates.get_list.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  getFeaturedList = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_templates.get_featured_list.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  getDetail = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_templates.get_detail.routing',
      message: {
        authentication: req.authentication,
        params: req.params,
      }
    });

    return result;
  }

  create = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_templates.create.routing',
      message: {
        authentication: req.authentication,
        params: req.body,
      }
    });

    return result;
  }

  update = async (req: FastifyRequest<{
    Params: {
      templateUid: string;
    },
    Body: {
      templateUid: string;
      name?: string;
      categoryUid?: string;
      description?: string;
      content?: string;
      language?: string;
      isActive?: boolean;
      isFeatured?: boolean;
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_templates.update.routing',
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
      routing: 'rpc.chatbot.prompt_templates.set_status.routing',
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

  setFeatured = async (req: FastifyRequest<{
    Params: {
      templateUid: string
    },
    Body: {
      isFeatured: boolean
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_templates.set_featured.routing',
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

  delete = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_templates.delete.routing',
      message: {
        authentication: req.authentication,
        params: req.params,
      }
    });

    return result;
  }

  copy = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.prompt_templates.copy.routing',
      message: {
        authentication: req.authentication,
        params: req.params,
      }
    });

    return result;
  }
}