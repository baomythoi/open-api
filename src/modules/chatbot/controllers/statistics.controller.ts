import BaseController from '@core/base.controller';
import { FastifyReply, FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Statistics extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  // User controllers
  getRecentCustomers = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.get_recent_customers.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  getTokenUsageChart = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.get_token_usage_chart.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  getMonthlyCustomerCount = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.get_monthly_customer_count.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  getMonthlyTokenUsage = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.get_monthly_token_usage.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  getMonthlyConversations = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.get_monthly_conversations.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  getConversationChart = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.get_conversation_chart.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  // Admin controllers
  adminGetTokenUsageChart = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.admin_get_token_usage_chart.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }

  adminGetMonthlyTokenUsage = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.admin_get_monthly_token_usage.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }

  adminGetMonthlyConversations = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.admin_get_monthly_conversations.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }

  adminGetConversationChart = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.admin_get_conversation_chart.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }

  adminGetTotalUsersCount = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.admin_get_total_users.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }

  adminGetTotalExpiredUsersCount = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.statistics.admin_get_total_expired_users.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }
}