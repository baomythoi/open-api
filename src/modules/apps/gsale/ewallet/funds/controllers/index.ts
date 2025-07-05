import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Funds extends BaseController {
  protected exchange = 'rpc.service.ewallet.exchange';

  constructor() {
    super();
  }

  getAccount = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getAccountResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.fund.get_account.routing',
      message: {
        params: {
          ownerCode: req.authentication.username
        }
      }
    })
    if (!getAccountResult.success)
      return getAccountResult;

    const account = {
      uid: getAccountResult.data.uid,
      type: getAccountResult.data.type,
      balance: getAccountResult.data.balance,
      debt: getAccountResult.data.debt
    }

    return this.responseSuccess(account);
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

  depositIntoFund = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const depositFundResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.fund.deposit.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return depositFundResult;
  }

  getTransactions = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const depositFundResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.ewallet.fund.transactions.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return depositFundResult;
  }
}