import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Internal extends BaseController {
  protected exchange = 'rpc.service.ewallet.exchange';

  constructor() {
    super();
  }

  getAllAccount = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getAllAccountResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.internal.crm_get_accounts.routing',
      message: {
        params: req.query
      }
    })

    return getAllAccountResult;
  }

  export = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const exportAccountResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.internal.crm_export_accounts.routing',
      message: {
        params: req.query
      }
    })

    return exportAccountResult;
  }

  getAccountTransactions = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getTransactionsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.internal.crm_get_account_transactions.routing',
      message: {
        params: req.query
      }
    })

    return getTransactionsResult;
  }

  getAccountTransaction = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getTransactionsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.internal.crm_get_account_transaction.routing',
      message: {
        params: req.params
      }
    })

    return getTransactionsResult;
  }

  manualTopup = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const topupResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.internal.deposit.routing',
      message: {
        params: req.body
      }
    })

    return topupResult;
  }

  recoverCommission = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    this.pushToWorker({
      exchange: 'worker.service.commission.exchange',
      routing: 'worker.commission.recover_internal_wallet.routing',
      message: {
        params: req.params
      }
    })

    return this.responseSuccess();
  }

  campaignManualTopup = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const topupResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.internal.campaign_deposit.routing',
      message: {
        params: {
          ...req.params as Record<string, any>,
          ...req.body as Record<string, any>
        }
      }
    })

    return topupResult;
  }
}