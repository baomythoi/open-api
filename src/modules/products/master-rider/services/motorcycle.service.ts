import BaseService from "@core/base.service";

// interface
import { FuncResponse } from '@interfaces/response';
import { Authentication } from '@interfaces/authentication/user';


export default new class MotorcyclesService extends BaseService {
  protected defaultExchange = 'rpc.service.products.master_rider.exchange';

  constructor() {
    super();
  }

  async getVehicleTypes(): Promise<FuncResponse<object>> {
    const message = {
      params: {}
    }

    const vehicleTypesResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products.master_rider.get_vehicle_types.routing',
      message
    });

    return vehicleTypesResult;
  }

  async getManufactures(params: any): Promise<FuncResponse<object>> {
    const message = {
      params
    }

    const listResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products.master_rider.get_manufacture.routing',
      message
    });

    return listResult;
  }

  async getMotorcycles(params: any): Promise<FuncResponse<object>> {
    const message = {
      params
    }

    const listResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products.master_rider.get_motorcycles.routing',
      message
    });

    return listResult;
  }

  async getPackages(params: any, authentication: Authentication): Promise<FuncResponse<object>> {
    const message = {
      authentication,
      params
    }

    const listResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products.master_rider.get_packages.routing',
      message
    });

    return listResult;
  }

  async verifyRedeemCode(params: any, authentication: Authentication): Promise<FuncResponse<object>> {
    const message = {
      params,
      authentication
    }

    const verifyResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products.master_rider.verify_redeem_code.routing',
      message
    });

    return verifyResult;
  }

  async createOrder(params: any, authentication: Authentication): Promise<FuncResponse<object>> {
    const message = {
      params,
      authentication
    }

    const createResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products.master_rider.create_order.routing',
      message
    });

    return createResult;
  }

  async getCertificate(params: any): Promise<FuncResponse<object>> {
    const message = {
      params
    }

    const getCertResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products.master_rider.get_certificate.routing',
      message
    });

    return getCertResult;
  }

  async manualCommissionPayout(params: any): Promise<FuncResponse<object>> {
    const message = {
      params
    }

    const payoutResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products.master_rider.commission_manual_payout.routing',
      message
    });

    return payoutResult;
  }

  async getCommissionForView(params: any, authentication: Authentication) {
    const message = {
      params,
      authentication
    }

    const comViewResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products.master_rider.get_commission_for_view.routing',
      message
    });

    return comViewResult;
  }

  async manualNotificationsSend(params: any): Promise<FuncResponse<object>> {
    const message = {
      params
    }

    const notificationsSendResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.products.master_rider.notification_manual_order_complete.routing',
      message
    });

    return notificationsSendResult;
  }
}