import BaseController from '@core/base.controller';
import { FastifyReply, FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Prompts extends BaseController {
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
}