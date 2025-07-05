import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Funds extends BaseController {
  protected exchange = 'rpc.service.ewallet.exchange';

  constructor() {
    super();
  }

  createAccount = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const createAccountResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.fund.create_account.routing',
      message: {
        params: req.body
      }
    })

    return createAccountResult;
  }

  getAllAccount = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getAllAccountResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.fund.crm_get_accounts.routing',
      message: {
        params: req.query
      }
    })

    return getAllAccountResult;
  }

  getAccountTransactions = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getTransactionsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.fund.crm_get_account_transactions.routing',
      message: {
        params: req.query
      }
    })

    return getTransactionsResult;
  }

  updateBalance = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const updateBalanceResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.fund.crm_update_balance.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params as Record<string, any>,
          ...req.body as Record<string, any>
        }
      }
    })

    return updateBalanceResult;
  }

  updateDebt = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const updateDebtResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.fund.crm_update_debt.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params as Record<string, any>,
          ...req.body as Record<string, any>
        }
      }
    })

    return updateDebtResult;
  }

  exportAllAccount = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const exportAllAccountResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.fund.crm_export_accounts.routing',
      message: {
        params: req.query
      }
    })

    return exportAllAccountResult;
  }

  exportAccountTransactions = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const exportTransactionsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.fund.crm_export_account_transactions.routing',
      message: {
        params: req.query
      }
    })

    return exportTransactionsResult;
  }
}