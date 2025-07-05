import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class User extends BaseController {
  protected exchange = 'rpc.service.merchant.exchange';

  constructor() {
    super();
  }

  profile = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getProfileResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.merchant.get_profile.routing',
      message: {
        params: {
          username: req.authentication.username
        }
      }
    });

    return getProfileResult;
  }

  editProfile = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const editProfileResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.merchant.edit_profile.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return editProfileResult;
  }

  changePassword = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const changePasswordResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.merchant.change_password.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return changePasswordResult;
  }
}